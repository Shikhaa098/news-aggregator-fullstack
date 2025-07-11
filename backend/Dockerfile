FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    zip \
    unzip \
    git \
    curl \
    libzip-dev \
    locales \
    jpegoptim optipng pngquant gifsicle \
    vim \
    nano \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-configure zip
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl

# Set working directory
WORKDIR /var/www

# Copy project files into the container
COPY . .

# Copy Composer from the Composer image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Permissions (if needed)
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage

# Expose port if needed (optional for artisan serve)
EXPOSE 8000

# Default command to serve the app (optional — used in docker-compose)
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
