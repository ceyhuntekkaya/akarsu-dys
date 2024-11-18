# pull official base image
FROM node:14-alpine
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app
COPY package-lock.json /app
# COPY yarn.lock ./
RUN npm install
# RUN npm install react-helmet --force
# RUN npm install react-scripts@3.4.1 -g

# add app
COPY . /app
# EXPOSE 3000
# start app
CMD ["npm", "start"]