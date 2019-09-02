FROM node:8
WORKDIR /app
EXPOSE 8080
CMD node dist/index.js

ADD ./package.json package-lock.json ./
RUN npm install --save-exact

ADD ./tsconfig.build.json ./tsconfig.json ./tslint.json ./README.md ./
ADD ./src ./src
RUN npm run lint && \
    npm test && \
    npm run build

ENV NODE_ENV=production
