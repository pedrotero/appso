# appso
#Docker compose application for managing a simple cattle management software made with node and mysql.

#Commands to execute on shell to start application:
docker build -f SqlDocker ./ -t mysqlso
docker build ./ -t nodeso
docker-compose -p appso up
