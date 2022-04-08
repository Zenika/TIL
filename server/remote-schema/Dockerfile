FROM node

WORKDIR /server
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
# If you are building your code for production
# RUN npm ci --only=production
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]