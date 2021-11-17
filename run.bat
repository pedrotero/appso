docker build -f SqlDocker ./ -t mysqlso
docker build ./ -t nodeso
docker-compose -p appso up