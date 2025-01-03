# Build stage
FROM node:18 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

# Serve with Nginx
FROM nginx:stable-alpine

# Copy build output to Nginx's default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx config template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Dynamically bind to $PORT from Cloud Run
ENV PORT 8080
EXPOSE 8080

# Use envsubst to replace $PORT in Nginx config and start Nginx
CMD ["sh", "-c", "envsubst '$$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
