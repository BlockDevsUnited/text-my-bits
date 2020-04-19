FROM node:10

WORKDIR /app
COPY . ./

RUN yarn 2> /dev/null
RUN yarn build:mainnet

RUN yarn global add serve
EXPOSE 5000
CMD [ "serve", "-s", "build", "-l", "5000"]
