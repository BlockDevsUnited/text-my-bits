FROM node:10

WORKDIR /app
COPY . ./

RUN yarn 2> /dev/null
RUN yarn build:testnet

RUN yarn global add serve
EXPOSE 5001
CMD [ "serve", "-s", "build", "-l", "5001"]
