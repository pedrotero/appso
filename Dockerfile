FROM node
COPY . ./
WORKDIR ./
CMD npm start