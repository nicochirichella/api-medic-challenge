# create dockerfile with node alpine image and copy src folder and package.json and install dependencies and run the app
FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]