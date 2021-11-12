CREATE USER 'node'@'localhost' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON *.* TO 'node'@'localhost' WITH GRANT OPTION;
CREATE USER 'node'@'172.20.128.3' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON *.* TO 'node'@'172.20.128.3' WITH GRANT OPTION;
CREATE USER 'root'@'172.20.128.3' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'172.20.128.3' WITH GRANT OPTION;
FLUSH PRIVILEGES;
create database if not exists gantv;
USE gantv;

create table if not exists bovino (
id int not null,
fechaNacimiento date not null,
sexo varchar(6) not null,
motivoBaja varchar(10),
fechaBaja date,
tipo int not null,
primary key(id));

create table if not exists veterinario (
id int not null,
nombre varchar(20) not null,
tel bigint not null,
dir varchar(50),
empresa varchar(20) not null,
primary key(id));

create table if not exists reporte(
id int not null auto_increment,
fechaReporte date not null,
idVet int not null,
idBovino int not null,
evo int not null,
kgComida int not null,
lAgua int not null,
lLeche int,
primary key(id),
foreign key(idVet) references veterinario(id),
foreign key(idBovino) references bovino(id));

create table if not exists enfermedad (
id int not null auto_increment,
nombre varchar(50),
primary key(id));

create table if not exists reporteEnfermedad (
id int not null auto_increment,
idReporte int not null,
idEnfermedad int not null,
primary key(id),
foreign key(idReporte) references reporte(id),
foreign key(idEnfermedad) references enfermedad(id));

create table if not exists vacuna (
id int not null auto_increment,
nombre varchar(50),
primary key(id));

create table if not exists reporteVacuna (
id int not null auto_increment,
idReporte int not null,
idVacuna int not null,
primary key(id),
foreign key(idReporte) references reporte(id),
foreign key(idVacuna) references vacuna(id));

create table if not exists pajilla (
id int not null auto_increment,
idToro int not null,
idVet int not null,
fechaEmpaque date not null,
disp boolean not null,
primary key(id),
foreign key(idToro) references bovino(id),
foreign key(idVet) references veterinario(id)
);

create table if not exists inseminacion (
id int not null auto_increment,
idPajilla int not null,
idVaca int not null,
idVet int not null,
fechaInseminacion date not null,
primary key(id),
foreign key(idPajilla) references pajilla(id),
foreign key(idVaca) references bovino(id),
foreign key(idVet) references veterinario(id)
);

create table if not exists reporteEmbarazo (
id int not null auto_increment,
idInseminacion int not null,
idVet int not null,
mes int not null,
peso int not null,
fechaParto date,
primary key(id),
foreign key(idVet) references veterinario(id),
foreign key(idInseminacion) references inseminacion(id)
);

create table if not exists cliente (
id int not null,
nombre varchar(20) not null,
tel bigint not null,
dir varchar(50),
primary key(id)
);

create table if not exists ventaAnimal (
id int not null auto_increment,
idCliente int not null,
idBovino int not null,
fechaVenta date not null,
peso int not null,
valor int not null,
primary key(id),
foreign key(idBovino) references bovino(id),
foreign key(idCliente) references cliente(id)
);

create table if not exists ventaPajilla (
id int not null auto_increment,
idPajilla int not null,
idCliente int not null,
fechaVenta date not null,
valor int not null,
primary key(id),
foreign key(idPajilla) references pajilla(id),
foreign key(idCliente) references cliente(id)
);