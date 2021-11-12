# appso
#Aplicación de administración ganadera hecha en Docker Compose basada en node y MySQL

#Comandos para ejecutar en shell para iniciar la aplicación:
docker build -f SqlDocker ./ -t mysqlso
docker build ./ -t nodeso
docker-compose -p appso up
