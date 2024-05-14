FROM node:12 as frontend

RUN mkdir -p /var/www/html/dist

WORKDIR /var/www/html

COPY ./package*.json ./

RUN npm install --no-progress --silent

COPY ./ ./

RUN npm run build


FROM nginx:1.23.0 as app

ENV TZ=America/Sao_Paulo \
    APP_HOME=/var/www/html

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR $APP_HOME

COPY --chown=www-data:www-data --from=frontend $APP_HOME/dist $APP_HOME

# support running as arbitrary user which belogs to the root group
RUN chgrp -R 0 /var/cache/nginx /var/run /var/log/nginx /etc/nginx $WORKDIR \
    && chmod -R g=u /var/cache/nginx /var/run /var/log/nginx /etc/nginx $WORKDIR

EXPOSE 8080
