FROM node:14.18.2

WORKDIR /app
COPY . /app
CMD ["tail", "-f", "/dev/null"]
