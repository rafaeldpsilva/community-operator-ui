sudo docker stop tiocps-community-operator-ui
sudo docker rm tiocps-community-operator-ui
sudo docker rmi rdpds/tiocps-community-operator-ui
sudo docker pull rdpds/tiocps-community-operator-ui:latest
sudo docker run -d --name tiocps-community-operator-ui -p 8080:80 rdpds/tiocps-community-operator-ui
