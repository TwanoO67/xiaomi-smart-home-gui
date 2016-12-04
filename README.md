# Xiaomi Smart Home - GUI

construction du docker
docker build -t myuser/containername

lancement du logger
docker run -v /mydata/store:/data -d --net host --name xiaomi_logger myuser/containername
