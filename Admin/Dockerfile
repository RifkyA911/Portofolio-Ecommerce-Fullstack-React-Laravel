FROM node:16-alpine

# WORDKIR same as .
WORKDIR /app

# get all with same as 'package' name
COPY package*.json .
RUN npm install

# copy all source to the container
COPY . .
# run project in the container
CMD ["npm", "run", "dev"]