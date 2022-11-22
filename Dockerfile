FROM node:14.17-alpine
RUN mkdir -p /server
WORKDIR /server
COPY /server /server
RUN yarn
CMD [ "yarn", "start" ]