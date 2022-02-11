FROM node:lts-gallium

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

COPY . ./

CMD [ "yarn", "start" ]