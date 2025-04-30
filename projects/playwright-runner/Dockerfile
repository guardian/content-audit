ARG FUNCTION_DIR="/function"

FROM mcr.microsoft.com/playwright:v1.51.1-noble AS build-image

ARG FUNCTION_DIR

# Install aws-lambda-ric build dependencies
RUN apt-get update && apt-get install -y \
    g++ \
    make \
    cmake \
    unzip \
    libcurl4-openssl-dev \
    autoconf \
    libtool \
    patch

ENV SETUPTOOLS_USE_DISTUTILS=stdlib

RUN mkdir -p ${FUNCTION_DIR}
WORKDIR ${FUNCTION_DIR}

# Create function dir and install node packages. Do this first to
# ensure we have a separate cache layer for the install process.
COPY ./package.json ${FUNCTION_DIR}
COPY ./package-lock.json ${FUNCTION_DIR}
COPY ./prisma/ ${FUNCTION_DIR}/prisma/

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
ENTRYPOINT [ "/entrypoint.sh", "src/index.handler"]
