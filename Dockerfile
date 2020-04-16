# Use the official image as a parent image.
FROM ubuntu:latest

# Set the working directory.
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
COPY Test .

# Run the command inside your image filesystem.
RUN ls

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 48080

# Run the specified command within the container.
CMD [ "cd", "Test" ]

# Copy the rest of your app's source code from your host to your image filesystem.
CMD ["ls"]
