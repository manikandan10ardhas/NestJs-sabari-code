FROM node:18-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Create app directory, this is in our container/in our image
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# To overcome conflict with husky in post npm script
RUN npm install husky -g 

# Install all dependencies, both production and development
RUN npm ci --omit=dev && npm cache clear -f

# Bundle app source
COPY --chown=node:node . .

# RUN ls -alh

# Build the app
# RUN npm run build


USER node

EXPOSE 3000

CMD ["node", "./dist/main.js"]
