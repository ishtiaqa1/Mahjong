FROM php:8.2-cli
RUN apt-get update && apt-get install -y unzip curl
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install mysqli pdo pdo_mysql
COPY . /app
WORKDIR /app
RUN composer install
EXPOSE 8080
CMD ["php", "-S", "0.0.0.0:8080"]