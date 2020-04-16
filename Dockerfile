FROM alpine/git as clone (1)
WORKDIR /app
RUN git clone https://github.com/spring-projects/spring-petclinic.git

FROM maven:3.5-jdk-8-alpine as build (2)
WORKDIR /app
COPY --from=clone /app/spring-petclinic /app (3)
RUN mvn install

FROM openjdk:8-jre-alpine
WORKDIR /app
