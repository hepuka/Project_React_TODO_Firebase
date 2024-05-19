# docker build -t todo-app:latest --platform linux/x86_64 .
# docker run -it -p 3000:3000 todo-app:latest

FROM node:18.13.0
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent
COPY . ./
CMD ["npm", "start"]
