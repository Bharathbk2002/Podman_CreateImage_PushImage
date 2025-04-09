FROM node:16
WORKDIR /app
COPY app.js .
EXPOSE 4000
CMD ["node","app.js"]