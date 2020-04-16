FROM alpine/git
WORKDIR /app
RUN git clone --single-branch --branch javaee8 https://github.com/DamnDaniel7/es-2019-2020-P51.git

FROM maven:3.5-jdk-8-alpine
WORKDIR /app
RUN ls

FROM openjdk:8-jre-alpine
WORKDIR /app
