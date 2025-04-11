FROM node

WORKDIR ./travel-portal

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run" , "dev"]