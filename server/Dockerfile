FROM php:8.2-apache
RUN docker-php-ext-install mysqli pdo pdo_mysql && \
    a2dismod mpm_event mpm_worker && \
    a2enmod mpm_prefork && \
    sed -i 's/Listen 80/Listen 8080/' /etc/apache2/ports.conf && \
    sed -i 's/<VirtualHost \*:80>/<VirtualHost *:8080>/' /etc/apache2/sites-enabled/000-default.conf
COPY . /var/www/html/
EXPOSE 8080
CMD ["apache2-foreground"]