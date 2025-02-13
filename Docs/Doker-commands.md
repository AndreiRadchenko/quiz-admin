# Docker and Docker Compose Commands with Examples

## Table of Contents

1. [Installation and Setup](#1-installation-and-setup)
2. [Managing Containers](#2-managing-containers)
3. [Useful Docker Commands](#3-useful-docker-commands)
4. [Docker Volume Commands](#4-docker-volume-commands)
5. [Docker Compose Commands](#5-docker-compose-commands)
6. [Persistent Containers with Restart Policy](#6-persistent-containers-with-restart-policy)
7. [Using Environment Variables in Dockerfiles](#7-using-environment-variables-in-dockerfiles)
8. [Advanced Docker Buildx Usage](#8-advanced-docker-buildx-usage)
9. [Reinstall and Manage Specific Containers](#9-reinstall-and-manage-specific-containers)

[Back to Top](#docker-and-docker-compose-commands-with-examples)

---

### Check Docker Daemon Ownership

```bash
ls -l /var/run/docker.sock
```

1. Create the docker Group

   ```bash
   sudo groupadd docker
   ```

2. Add Your User to the docker Group

    ```bash
    sudo usermod -aG docker $USER
    ```

3. Change Ownership of Docker Socket
Ensure that the Docker socket is owned by the docker group:

    ```bash
    sudo chown root:docker /var/run/docker.sock
    ```

4. Set Correct Permissions
Ensure the socket has the correct permissions:

    ```bash
    sudo chmod 660 /var/run/docker.sock
    ```

5. Restart Docker Service

   ```bash
   sudo systemctl restart docker
   ```

6. Verify Group Membership and Ownership
To confirm the changes:

Check if your user is in the docker group:

```bash
groups $USER
```

Confirm the ownership of the Docker socket:

```bash
ls -l /var/run/docker.sock
```

You should see something like this:

```bash
srw-rw---- 1 root docker 0 Jan 30 09:00 /var/run/docker.sock
```

7. Log Out and Back In
For the group changes to take effect, log out and back in or run:

```bash
newgrp docker
```

Now you should be able to run Docker commands without sudo.

## 1. Installation and Setup

### Install Docker and Docker Compose

```bash
sudo apt install docker docker-compose
```

### Add User to Docker Group

```bash
sudo usermod -aG docker pi
```

### Start Docker Daemon

```bash
systemctl start docker
```

### Enable Docker and Containerd to Start on Boot

```bash
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

### Disable Docker and Containerd from Starting on Boot

```bash
sudo systemctl disable docker.service
sudo systemctl disable containerd.service
```

[Back to Top](#docker-and-docker-compose-commands-with-examples)

---

## 2. Managing Containers

### Download Portainer

```bash
sudo docker pull portainer/portainer-ce:linux-arm
```

### Start Portainer Container

```bash
sudo docker run --restart always -d -p 9000:9000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data portainer/portainer-ce:linux-arm
```

_Portainer credentials: User - `admin`, Password - `MishaDimaVika`_

### Start `web_recognition` Container with Volume Mapping

```bash
docker run --restart always -d --name=web_face \
  --mount source=data,destination=/root/face_recognition/examples/data \
  -p 5001:5001 web_recognition:210515
```

### Run a `web_recognition` Container Interactively

```bash
docker run -it --name=web_face \
  --mount source=data,destination=/root/face_recognition/examples/data \
  -p 5001:5001 andriiradchenko/web_recognition:210515
```

[Back to Top](#docker-and-docker-compose-commands-with-examples)

---

## 3. Useful Docker Commands

### List All Images

```bash
docker images
```

### Run a Container in Daemon Mode with Port Forwarding

```bash
docker run -d -p 1234:8080 tomcat
```

### List Running Containers

```bash
docker ps
```

### Stop and Remove a Container

```bash
docker rm [container_id]
```

### Remove an Image

```bash
docker rmi tomcat
```

### Build an Image from a Dockerfile

```bash
docker build -t web_recognition_v01:amd64 . --load
```

### Remove Intermediate Images in a Multistage Build

```bash
docker image prune -f --filter label=stage=build-step
```

### Stop and Remove All Containers

```bash
docker rm -f $(docker ps -aq)
```

### Run a Shell Inside a Container

```bash
docker exec -it [container_id] /bin/bash
```

### Exit a Container Shell

```bash
exit
```

### Commit a Running Container as an Image

```bash
docker commit [container_id] newimage_v2:latest
```

[Back to Top](#docker-and-docker-compose-commands-with-examples)

---

## 4. Docker Volume Commands

### List Volumes

```bash
docker volume ls
```

### Inspect a Volume

```bash
docker volume inspect data
```

[Back to Top](#docker-and-docker-compose-commands-with-examples)

---

## 5. Docker Compose Commands

### Build Containers Without Using the Cache

```bash
docker-compose build --no-cache
```

### Build and Start Containers

```bash
docker-compose up
```

### Start in Detached Mode (No Logs)

```bash
docker-compose up -d
```

### Stop and Remove Containers

```bash
docker-compose down
```

### Stop and Remove Containers with Associated Images

```bash
docker-compose down --rmi all
```

### Start/Stop Specific Services

```bash
docker-compose start

docker-compose stop
```

### View Running Services

```bash
docker-compose ps
```

### View Docker Compose Images

```bash
docker-compose images
```

[Back to Top](#docker-and-docker-compose-commands-with-examples)

---

## 6. Persistent Containers with Restart Policy

To ensure containers restart on host reboot, use the `restart: unless-stopped`
policy in `docker-compose.yml`:

```yaml
services:
  nextjs:
    build:
      context: ./quiz-admin
      args:
        NEXT_PUBLIC_S3_END_POINT: minio-compose
        NEXT_PUBLIC_S3_PORT: 9000
    container_name: nextjs
    restart: unless-stopped
    ports:
      - '3000:3000'
    environment:
      NEXT_PUBLIC_S3_END_POINT: minio-compose
      NEXT_PUBLIC_S3_PORT: 9000
      NEXT_PUBLIC_S3_ACCESS_KEY: minio
      NEXT_PUBLIC_S3_SECRET_KEY: miniominio
      NEXT_PUBLIC_S3_BUCKET_QUESTIONS: questions
      NEXT_PUBLIC_S3_BUCKET_PLAYERS: players
    working_dir: /app
    depends_on:
      - minio-compose
    networks:
      - quiz-network
```

Start the stack:

```bash
docker-compose up -d
```

[Back to Top](#docker-and-docker-compose-commands-with-examples)

---

## 7. Using Environment Variables in Dockerfiles

### Add Environment Variables in the `Dockerfile`

```dockerfile
# Build arguments
ARG NEXT_PUBLIC_S3_END_POINT
ARG NEXT_PUBLIC_S3_PORT

# Export environment variables
ENV NEXT_PUBLIC_S3_END_POINT=$NEXT_PUBLIC_S3_END_POINT
ENV NEXT_PUBLIC_S3_PORT=$NEXT_PUBLIC_S3_PORT
```

### Pass Variables During Build

```bash
docker-compose build --build-arg NEXT_PUBLIC_S3_END_POINT=minio-compose \
  --build-arg NEXT_PUBLIC_S3_PORT=9000
```

[Back to Top](#docker-and-docker-compose-commands-with-examples)

---

## 8. Advanced Docker Buildx Usage

### Create a Multi-Platform Builder

```bash
docker buildx create --platform linux/arm64,linux/arm/v7
```

### Use a Custom Builder

```bash
docker buildx use [OPTIONS] NAME
```

### Run a QEMU-Enabled Multiarch Builder

```bash
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
```

### Build Multi-Platform Images

```bash
docker buildx build --platform linux/arm64 -t user/repo --no-cache --pull .
```

### Example: Build for Specific Platforms

```bash
# Build for ARMv7 (32-bit)
docker buildx build --platform linux/arm/v7 -t web_recognition:armv7 . --load

# Build for ARM64 (64-bit)
docker buildx build --platform linux/arm64 -t web_recognition:arm64 .
```

[Back to Top](#docker-and-docker-compose-commands-with-examples)

---

## 9. Reinstall and Manage Specific Containers

### Reinstall `web_face` Container

#### Pull Updated Image

```bash
docker pull andriiradchenko/web_recognition:armv702
```

#### Run with Volume Mapping

```bash
docker run --restart always -d --name=web_face \
  --mount source=data,destination=/root/face_recognition/examples/data \
  -p 5001:5001 web_recognition:armv702
```

#### Persistent Data Example

```bash
docker run --restart always -d --name=web_face -v face_data:/root/face_recognition/examples \
  -p 5001:5001 andriiradchenko/web_recognition
```

[Back to Top](#docker-and-docker-compose-commands-with-examples)
