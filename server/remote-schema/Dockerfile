FROM node

WORKDIR /server
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
# If you are building your code for production
# RUN npm ci --only=production
COPY . .

EXPOSE 8080

ARG CLIENT_URL
ARG REMOTE_SCHEMA_URL
ARG HASURA_ADMIN_SECRET
ARG HASURA_URL

ENV CLIENT_URL ${CLIENT_URL}
ENV REMOTE_SCHEMA_URL ${REMOTE_SCHEMA_URL}
ENV HASURA_ADMIN_SECRET ${HASURA_ADMIN_SECRET}
ENV HASURA_URL ${HASURA_URL}

CMD [ "node", "src/index.js" ]