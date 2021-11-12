insert into bovino (id,fechaNacimiento,sexo,tipo) values (1,'2021-06-10','Hembra',0);
insert into bovino (id,fechaNacimiento,sexo,tipo) values (2,'2021-06-10','Macho',1);
insert into bovino (id,fechaNacimiento,sexo,tipo) values (3,'2021-06-10','Hembra',2);
insert into bovino (id,fechaNacimiento,sexo,tipo) values (4,'2021-06-10','Hembra',3);

insert into veterinario (id,nombre,tel,dir,empresa) values (1,'polo',911,'Uninorte','Uninorte');

insert into reporte (fechaReporte,idVet,idBovino,evo,kgComida,lAgua,lLeche) values ('2021-05-10',1,1,10,11,4,2);
insert into reporte (fechaReporte,idVet,idBovino,evo,kgComida,lAgua) values ('2021-05-10',1,2,10,11,4);

insert into enfermedad (nombre) values ('polovirosis');
insert into enfermedad (nombre) values ('amogus');

insert into reporteEnfermedad (idReporte,idEnfermedad) values (1,1);
insert into reporteEnfermedad (idReporte,idEnfermedad) values (1,2);
insert into reporteEnfermedad (idReporte,idEnfermedad) values (2,1);

insert into vacuna (nombre) values ('polovacuna');
insert into vacuna (nombre) values ('polo');

insert into reporteVacuna (idReporte,idVacuna) values (1,1);
insert into reporteVacuna (idReporte,idVacuna) values (1,2);
insert into reporteVacuna (idReporte,idVacuna) values (2,1);

insert into pajilla (idToro,idVet,fechaEmpaque,disp) values (2,1,'2021-05-10',1);
insert into pajilla (idToro,idVet,fechaEmpaque,disp) values (2,1,'2021-05-10',1);
insert into pajilla (idToro,idVet,fechaEmpaque,disp) values (2,1,'2021-05-10',1);

insert into inseminacion (idPajilla,idVaca,idVet,fechaInseminacion) values (1,1,1,'2021-05-10');
update pajilla set disp=0 where id=1;
insert into reporteEmbarazo (idInseminacion,idVet,mes,peso,fechaParto) values (1,1,2,20,'2021-12-10');

insert into cliente (id,nombre,tel,dir) values (1,'polo',3119402132,'Uninorte');

insert into ventaAnimal (idCliente,idBovino,fechaVenta,peso,valor) values (1,3,'2021-05-10',400,100000);
update bovino set motivoBaja='Venta',fechaBaja='2021-05-10' where id=3;

insert into ventaPajilla (idPajilla,idCliente,fechaVenta,valor) values (2,1,'2021-05-10',400);
update pajilla set disp=0 where id=2;

