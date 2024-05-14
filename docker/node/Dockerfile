FROM node:12

ENV TZ=America/Sao_Paulo

ENV VUE_APP_APP_ENV=hml

WORKDIR /var/www/html

COPY ./ ./

RUN npm install

CMD sh -c "while true; do sleep 100; done"

EXPOSE 8081
