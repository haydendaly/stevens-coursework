FROM node

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm install serve -g
RUN npm run build

EXPOSE 8000
CMD ["serve", "-s", "build", "-l", "8000"]