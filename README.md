# appso
#Aplicación de administración ganadera hecha en Docker Compose basada en node y MySQL

#Comandos a ejecutar en shell para iniciar la aplicación:   
docker build -f SqlDocker ./ -t mysqlso   
docker build ./ -t nodeso   
docker-compose -p appso up   
#La aplicación fallará la primera vez por errores de runtime, por lo cual hay que ejecutar "docker-compose -p appso up" una vez más para que la aplicación funcione correctamente
#Para acceder a la aplicación, ingresar a localhost:3000   
