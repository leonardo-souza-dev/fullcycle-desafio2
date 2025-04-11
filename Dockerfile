FROM node:22.14.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build



ENV DOCKERIZE_VERSION v0.9.3

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*



EXPOSE 3008

ENV DB_HOST=mysql

CMD ["npm", "start"]
