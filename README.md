# Xiaomi Smart Home - GUI

construction du docker
docker build -t myuser/containername

lancement du logger
docker run -v /mydiskdata/store:/mihome/db -d --net host --name xiaomi_logger myuser/containername
