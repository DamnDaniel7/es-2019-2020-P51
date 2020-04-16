FROM maven:3.5-jdk-8-alpine/git
WORKDIR /app
RUN git clone --single-branch --branch javaee8 https://github.com/DamnDaniel7/es-2019-2020-P51.git
RUN ls

