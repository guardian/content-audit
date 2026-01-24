ARG FUNCTION_DIR="/function"
ARG PRISMA_DIR="${FUNCTION_DIR}/prisma"
ARG ROOT_CERT_PATH="${PRISMA_DIR}/root.pem"

FROM mcr.microsoft.com/playwright:v1.51.1-noble AS build-image

ARG FUNCTION_DIR
ARG PRISMA_DIR
ARG ROOT_CERT_PATH

# Install aws-lambda-ric build dependencies
RUN apt-get update && apt-get install -y \
    g++ \
    make \
    cmake \
    unzip \
    libcurl4-openssl-dev \
    autoconf \
    libtool \
    patch \
    postgresql-client

ENV SETUPTOOLS_USE_DISTUTILS=stdlib

RUN mkdir -p ${FUNCTION_DIR}
WORKDIR ${FUNCTION_DIR}

# The following copy commands are split to ensure we have discrete layers for
# different parts of the build process, ensuring good caching when we only ship
# code changes. It'd be simpler to copy the entire working directory, but that
# would mean rebuilding most of the image on each build, which is much slower.

# Create function dir
COPY ./package.json ${FUNCTION_DIR}
COPY ./package-lock.json ${FUNCTION_DIR}
COPY ./prisma/ ${PRISMA_DIR}

# Copy the AWS root certificate into a place where postgres can access it.
# See https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.howitworks.html#rds-proxy-security.tls:~:text=When%20using%20a%20client%20with%20%2D%2Dssl%2Dmode%20VERIFY_CA%20or%20VERIFY_IDENTITY%2C%20specify%20the%20%2D%2Dssl%2Dca%20option%20pointing%20to%20a%20CA%20in%20.pem%20format.%20For%20the%20.pem%20file%20to%20use%2C%20download%20all%20root%20CA%20PEMs%20from%20Amazon%20Trust%20Services
RUN echo "rootpath: ${ROOT_CERT_PATH}"
RUN ls -lap ${FUNCTION_DIR}/prisma/

RUN mkdir -p /root/.postgresql
RUN curl https://www.amazontrust.com/repository/AmazonRootCA1.pem >> ${ROOT_CERT_PATH}
RUN curl https://www.amazontrust.com/repository/AmazonRootCA2.pem >> ${ROOT_CERT_PATH}
RUN curl https://www.amazontrust.com/repository/AmazonRootCA3.pem >> ${ROOT_CERT_PATH}
RUN curl https://www.amazontrust.com/repository/AmazonRootCA4.pem >> ${ROOT_CERT_PATH}
RUN curl https://www.amazontrust.com/repository/SFSRootCAG2.pem >> ${ROOT_CERT_PATH}
RUN chmod 666 ${ROOT_CERT_PATH}

RUN ls -lap ${FUNCTION_DIR}/prisma

# Install node packages

RUN npm install
RUN npm install aws-lambda-ric
RUN cd node_modules/aws-lambda-ric && npm run update-deps && npm run preinstall && npm run postinstall

# Copy TS code and config files, and typecheck
COPY ./src ${FUNCTION_DIR}/src
COPY ./tsconfig.json ${FUNCTION_DIR}
COPY ./playwright.config.ts ${FUNCTION_DIR}

RUN ./node_modules/.bin/tsc

# Copy everything else needed at runtime
COPY ./entrypoint.sh ${FUNCTION_DIR}

# Add Lambda Runtime Interface Emulator and use a script in the ENTRYPOINT for simpler local runs
ADD https://github.com/aws/aws-lambda-runtime-interface-emulator/releases/latest/download/aws-lambda-rie /usr/local/bin/aws-lambda-rie
RUN chmod 755 /usr/local/bin/aws-lambda-rie
COPY entrypoint.sh /
RUN chmod 755 /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh", "src/index.handler"]
