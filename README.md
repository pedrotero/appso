# appso  
#Aplicación de administración ganadera hecha en Docker Compose basada en node y MySQL  
  
#Comandos a ejecutar en shell para armar las images que usará la aplicación:   
docker build -f SqlDocker ./ -t mysqlso   
docker build ./ -t nodeso   
  
#Comando para iniciar la aplicación en shell:   
docker-compose -p appso up   
  
#Para acceder a la aplicación, ingresar a localhost:3000   
