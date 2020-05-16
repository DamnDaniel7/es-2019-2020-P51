FROM adoptopenjdk/openjdk8-openj9:alpine-slim
RUN apk --no-cache add curl
RUN curl -H 'Cache-Control: no-cache' -X GET http://192.168.160.99:8081/artifactory/libs-release/es/opo_bus/opo_bus/0.0.1/opo_bus-0.0.1.jar -O
ENTRYPOINT ["java","-jar","opo_bus-0.0.1.jar"]
