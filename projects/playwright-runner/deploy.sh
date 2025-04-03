IMAGE_NAME=playwright-runner-lambda
ACCOUNT_URL=308506855511.dkr.ecr.eu-west-1.amazonaws.com/test
echo docker build -t $IMAGE_NAME:latest .
docker build -t ${IMAGE_NAME}:latest .
docker tag $IMAGE_NAME:latest $ACCOUNT_URL/$IMAGE_NAME:latest
aws ecr get-login-password --region eu-west-1 --profile capi | docker login --username AWS --password-stdin $ACCOUNT_URL
docker push $ACCOUNT_URL/$IMAGE_NAME
