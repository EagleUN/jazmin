FROM node:10.15.0
WORKDIR /jazmin
COPY . /jazmin
RUN npm install

CMD npm run start
