FROM node:12.2.0-alpine

LABEL Author="Pawel Kalicki"
LABEL E-mail="kalicki.paul@icloud.com"
LABEL version="0.0.1a"

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_OPTIONS=--max_old_space_size=8192

COPY /frontend-app/package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

COPY ./frontend-app /app

CMD ["npm", "start"]
