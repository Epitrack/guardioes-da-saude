FROM node:6.2-onbuild
RUN apt-get update
RUN apt-get install -y ruby-compass
RUN ["gem", "install", "--no-rdoc", "--no-ri", "compass"]
RUN ["npm", "install", "-g", "bower", "grunt-cli"]
RUN ["bower", "install", "--allow-root"]
EXPOSE 9000
CMD ["grunt", "serve", "--force"]
