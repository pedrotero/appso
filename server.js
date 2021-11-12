//Paquetes de express y mysql
const express = require("express");
const app = express();
const pubdir = __dirname + "/public";
const mysql = require('mysql2');
//Declaración de la view engine y el puerto
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.listen(3000);
console.log("Listening on :3000")

//Conexión a mysql
const con = mysql.createConnection({
  host: "172.20.128.2",
  user: "root",
  password: "secret",
  database: "gantv"
});
console.log("bruh")
con.connect(function(err) { if (err) throw err});


//Página principal
app.get('/', function (req, res) {
  res.render("index");
});


//AddCeba
app.get('/AddCeba', function (req, res) {
    res.render("AddCeba");
});
app.post('/AddCeba', function (req, res) {
  var log=false
  var values="("+req.body.id+",'"+req.body.fechaNac+"','"+req.body.sexo+"',2)"
  var sql="INSERT INTO bovino (id,fechaNacimiento,sexo,tipo) VALUES "+values;
  con.query(sql, function (err, result) {
    if(err){
      console.log(err)
    }
    else{
      log=true
      console.log("1 record inserted");
    }
    res.render("AddCeba",{log});
    res.end();
  });
});

//AddCria
app.get('/AddCria', function (req, res) {
  res.render("AddCria");
});
app.post('/AddCria', function (req, res) {
  var log=false
  var values="("+req.body.id+",'"+req.body.fechaNac+"','"+req.body.sexo+"',3)"
  var sql="INSERT INTO bovino (id,fechaNacimiento,sexo,tipo) VALUES "+values;
  con.query(sql, function (err, result) {
    if(err){
      console.log(err)
    }
    else{
      log=true
      console.log("1 record inserted");
    }
    res.render("AddCria",{log});
    res.end();
  });
});

//AddPajilla
app.get('/AddPajilla', function (req, res) {
  res.render("AddPajilla");
});
app.post('/AddPajilla', function (req, res) {
  var log=false;
  var s="SELECT id from bovino where tipo=1 and motivoBaja IS NULL and id="+req.body.idToro
  var values="("+req.body.idToro+","+req.body.idVet+",'"+req.body.fechaEmpa+"',1)"
  var sql="INSERT INTO pajilla (idToro,idVet,fechaEmpaque,disp) VALUES "+values;
  con.query(s, function (er, result) {
    if(er){
      console.log(er)
    }
    else{
      if(result.length>0){
        con.query(sql, function (err, result) {
          if(err){
            console.log(err)
          }
          else{
            log=true
            console.log("1 record inserted");
          }
          res.render("AddPajilla",{log});
          res.end();
        });
      }
      else{
        res.render("AddPajilla",{log});
        res.end();
      }
    }
  });
});

//AddToro
app.get('/AddToro', function (req, res) {
  res.render("AddToro");
});
app.post('/AddToro', function (req, res) {
  var log=false
  var values="("+req.body.id+",'"+req.body.fechaNac+"', 'Macho',1)"
  var sql="INSERT INTO bovino (id,fechaNacimiento,sexo,tipo) VALUES "+values;
  con.query(sql, function (err, result) {
    if(err){
      console.log(err)
    }
    else{
      log=true
      console.log("1 record inserted");
    }
    res.render("AddToro",{log});
    res.end();
  });

});

//AddVaca
app.get('/AddVaca', function (req, res) {
  res.render("AddVaca");
});
app.post('/AddVaca', function (req, res) {
  var log=false;
  var values="("+req.body.id+",'"+req.body.fechaNac+"', 'Hembra',0)"
  var sql="INSERT INTO bovino (id,fechaNacimiento,sexo,tipo) VALUES "+values;
  con.query(sql, function (err, result) {
    if(err){
      console.log(err)
    }
    else{
      log=true
      console.log("1 record inserted");
    }
    res.render("AddVaca",{log});
    res.end();
  });
});

//CrearCliente
app.get('/CrearCliente', function (req, res) {
  res.render("CrearCliente");
});
app.post('/CrearCliente', function (req, res) {
  var log=false;
  var values="("+req.body.id+",'"+req.body.nom+"',"+req.body.tel+",'"+req.body.dir+"')"
  var sql="INSERT INTO cliente (id,nombre,tel,dir) VALUES "+values;
  con.query(sql, function (err, result) {
    if(err){
      console.log(err)
    }
    else{
      log=true
      console.log("1 record inserted");
    }
    res.render("CrearCliente",{log});
    res.end();
  });
});

//Dar de baja
app.get('/DarBaja', function (req, res) {
  res.render("DarBaja");
});
app.post('/DarBaja', function (req, res) {
  var log=false
  var s="SELECT id FROM bovino WHERE id ="+req.body.id+" AND motivoBaja IS NULL"
  var sql="UPDATE bovino SET motivoBaja='"+req.body.motivo+"', fechaBaja='"+req.body.fecha+"' WHERE id = "+req.body.id+";"
  con.query(s, function (er, result) {
    if(er){
      console.log(er)
    }
    else{
      if(result.length>0){
        con.query(sql, function (err, res2) {
          if(err){
            console.log(err)
          }
          else{
            log=true
            console.log("1 record updated");
          }
          res.render("DarBaja",{log});
          res.end();
        });
      }
      else{
        res.render("DarBaja",{log});
        res.end();
      }
    }
  });
});

//Inseminar
app.get('/Inseminar', function (req, res) {
  res.render("Inseminar");
});
app.post('/Inseminar', function (req, res) {
  var log=false
  var s="SELECT bovino.id FROM bovino,pajilla WHERE bovino.id="+req.body.idVac+" AND bovino.tipo=0 AND bovino.motivoBaja IS NULL AND pajilla.disp=1 AND pajilla.id="+req.body.idPaj
  var values="("+req.body.idPaj+","+req.body.idVac+","+req.body.idVet+",'"+req.body.fecha+"')"
  var sql="INSERT INTO inseminacion (idPajilla,idVaca,idVet,fechaInseminacion) VALUES "+values;
  var sqlp="UPDATE pajilla SET disp=0 WHERE id="+req.body.idPaj;
  con.query(s, function (er, result) {
    if(er){
      console.log(er)
    }
    else{
      if(result.length>0){
        con.query(sqlp, function (err, result) {
          if(err){
            console.log(err)
          }
          else{
            console.log("1 record updated");
          }
        });
        con.query(sql, function (err, result) {
          if(err){
            console.log(err)
          }
          else{
            log=true
            console.log("1 record inserted");
          }
          res.render("Inseminar",{log});
          res.end();
        });
        
      }
      else{
        res.render("Inseminar",{log});
        res.end();
      }
    }
  });
});


//Reemplazo
app.get('/Reemplazo', function (req, res) {
    res.render("Reemplazo");
});

app.post('/Reemplazo', function (req, res) {
    var log=false
    
    var s="SELECT id,sexo FROM bovino WHERE id="+req.body.id+" AND tipo=3"
    var sql="UPDATE bovino SET tipo ="+req.body.tipo+" WHERE id = "+req.body.id
    con.query(s, function (er, result) {
      if(er){
        console.log(er)
        
      }else{
        if(result.length>0){
          console.log(req.body)
          console.log(result)
          if(req.body.tipo==2 || (req.body.tipo!=2 && ((result[0].sexo=="Hembra" && req.body.tipo==0) ||(result[0].sexo=="Macho" && req.body.tipo==1))) ){
            con.query(sql, function (err, res2) {
              if(err){
                console.log(err)
    
              }
              else{
                log=true
                console.log("1 record updated");
              }
              res.render("Reemplazo",{log});
              res.end();
            });
          }else{
            res.render("Reemplazo",{log});
            res.end();
          }
        }

      }

      
    });
});


//RegistrarVacuna
app.get('/RegistrarVacuna', function (req, res) {
    res.render("RegistrarVacuna");
});

app.post('/RegistrarVacuna', function (req, res) {
  var log=false
  var values="('"+req.body.nom+"')"
  sql="INSERT INTO vacuna (nombre) VALUES "+values
  con.query(sql, function (err, result) {
    if(err){
      console.log(err)
    }
    else{
      log=true
      console.log("1 record inserted");
    }
    res.render("RegistrarVacuna",{log});
    res.end();
  });
});

//RegistrarEnfermedad
app.get('/RegistrarEnfermedad', function (req, res) {
  res.render("RegistrarEnfermedad");
});

app.post('/RegistrarEnfermedad', function (req, res) {
  var log=false
  var values="('"+req.body.nom+"')"
  var sql="INSERT INTO enfermedad (nombre) VALUES "+values;
  con.query(sql, function (err, result) {
    if(err){
      console.log(err)
    }
    else{
      log=true
      console.log("1 record inserted");
    }
    res.render("RegistrarEnfermedad",{log});
    res.end();
  });
});

//RegistrarVeterinario
app.get('/RegistrarVeterinario', function (req, res) {
    res.render("RegistrarVeterinario");
});

app.post('/RegistrarVeterinario', function (req, res) {
  var log=false
  var values="("+req.body.id+",'"+req.body.nom+"','"+req.body.nomEmp+"',"+req.body.tel+",'"+req.body.dir+"')"
  var sql="INSERT INTO veterinario (id,nombre,empresa,tel,dir) VALUES "+values;
  con.query(sql, function (err, result) {
    if(err){
      console.log(err)
    }
    else{
      log=true
      console.log("1 record inserted");
    }
    res.render("RegistrarVeterinario",{log});
    res.end();
  });
});

//ReporteEmbarazo
app.get('/ReporteEmbarazo', function (req, res) {
    res.render("ReporteEmbarazo");
});

app.post('/ReporteEmbarazo', function (req, res) {
  var log=false
  var values="("+req.body.idIn+","+req.body.idVet+","+req.body.mes+","+req.body.peso+",'"+req.body.fechaPar+"')"
  var sql="INSERT INTO reporteEmbarazo (idInseminacion,idVet,mes,peso,fechaParto) VALUES "+values;
  con.query(sql, function (err, result) {
    if(err){
      console.log(err)
    }
    else{
      log=true
      console.log("1 record inserted");
    }
    res.render("ReporteEmbarazo",{log});
    res.end();
  });
});

//ReporteSalud
app.get('/ReporteSalud', function (req, res) {
    var sql1="SELECT * FROM vacuna"
    var sql2="SELECT * FROM enfermedad"
    con.query(sql1, function (err, res1) {
      if (err) throw err;
      con.query(sql2, function (err, res2) {
        if (err) throw err;
        res.render("ReporteSalud", {res1,res2});
      });
    });
    
});

app.post('/ReporteSalud', function (req, res) {
  var s="SELECT MAX(id) AS id FROM reporte"
  con.query(s, function (err, r) {
    if(err){
      console.log(err)
    }
    else{
      if(req.body.leche!=""){
        var values="('"+req.body.fecha+"',"+req.body.idVet+","+req.body.idBov+","+req.body.evo+","+req.body.leche+","+req.body.agua+","+req.body.comida+")"
      }else{
        var values="('"+req.body.fecha+"',"+req.body.idVet+","+req.body.idBov+","+req.body.evo+",null,"+req.body.agua+","+req.body.comida+")"
      }
      var id=r[0].id+1
      var sqlrep="INSERT INTO reporte (fechaReporte,idVet,idBovino,evo,lLeche,lAgua,KgComida) VALUES "+values
      con.query(sqlrep, function (err, result) {
        if(err){
          console.log(err)
        }
        else{
          if(typeof req.body.vacuna != "string"){
            
            req.body.vacuna.forEach(vac => {
              var valvac="("+id+","+vac+")"
              var sqlvac="INSERT INTO reporteVacuna (idReporte,idVacuna) VALUES "+valvac
              con.query(sqlvac, function (err, resvac) {
                if (err) throw err;
              });
            });
          }else{
              console.log(req.body.vacuna)
              var valvac="("+id+","+req.body.vacuna+")"
              var sqlvac="INSERT INTO reporteVacuna (idReporte,idVacuna) VALUES "+valvac
              con.query(sqlvac, function (err, resvac) {
                if (err) throw err;
              });
          }
          if(typeof req.body.enfermedad != "string"){
            req.body.enfermedad.forEach(enf => {
              var valenf="("+id+","+enf+")"
              var sqlenf="INSERT INTO reporteEnfermedad (idReporte,idEnfermedad) VALUES "+valenf
              con.query(sqlenf, function (err, resenf) {
                if (err) throw err;
              });
            });
            res.redirect("/ReporteSalud");
            res.end();
          }else{
            var valenf="("+id+","+req.body.enfermedad+")"
            var sqlenf="INSERT INTO reporteVacuna (idReporte,idVacuna) VALUES "+valenf
              con.query(sqlvac, function (err, resvac) {
                if (err) throw err;
              });
              res.redirect("/ReporteSalud");
              res.end();
          }
        }
        
      });
    }
  });
});

//TablaBovino
app.get('/TablaBovino', function (req, res) {
  var sql = "SELECT * FROM bovino";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.render("TablaBovino", {result});
      res.end()
  });
});

//TablaCliente
app.get('/TablaCliente', function (req, res) {
  var sql = "SELECT * FROM cliente";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.render("TablaCliente", {result});
      res.end()
  });
});

//TablaEnfermedad
app.get('/TablaEnfermedad', function (req, res) {
  var sql = "SELECT * FROM enfermedad";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.render("TablaEnfermedad", {result});
      res.end()
  });
});

//TablaInseminacion
app.get('/TablaInseminacion', function (req, res) {
  var sql = "SELECT * FROM inseminacion";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.render("TablaInseminacion", {result});
      res.end()
  });
});

//TablaPajilla
app.get('/TablaPajilla', function (req, res) {
  var sql = "SELECT * FROM pajilla";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.render("TablaPajilla", {result});
      res.end()
  });
});

//TablaReporteEmbarazo
app.get('/TablaReporteEmbarazo', function (req, res) {
  var sql = "SELECT * FROM reporteembarazo";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.render("TablaReporteEmbarazo", {result});
      res.end()
  });
});



//TablaReporteSalud
app.get('/TablaReporteSalud', function (req, res) {
  var sql = "SELECT * FROM reporte";
  var sqlv = "SELECT vacuna.nombre,reporte.id FROM vacuna,reporteVacuna,reporte WHERE vacuna.id = reporteVacuna.idVacuna AND reporteVacuna.idReporte = reporte.id"
  var sqle = "SELECT enfermedad.nombre,reporte.id FROM enfermedad,reporteEnfermedad,reporte WHERE enfermedad.id = reporteEnfermedad.idEnfermedad AND reporteEnfermedad.idReporte = reporte.id"
    con.query(sql, function (err, result) {
      if (err) throw err;
      con.query(sqlv, function (err, vac) {
        if (err) throw err;
        con.query(sqle, function (err, enf) {
          if (err) throw err;
          res.render("TablaReporteSalud", {result,vac,enf});
          res.end()
        });
      });
    });
});



//TablaVacuna
app.get('/TablaVacuna', function (req, res) {
  var sql = "SELECT * FROM vacuna";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.render("TablaVacuna", {result});
      res.end()
  });
});

//TablaVentaAnimal
app.get('/TablaVentaAnimal', function (req, res) {
  var sql = "SELECT * FROM ventaAnimal";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.render("TablaVentaAnimal", {result});
      res.end()
  });
});

//TablaVentaPajilla
app.get('/TablaVentaPajilla', function (req, res) {
  var sql = "SELECT * FROM ventaPajilla";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.render("TablaVentaPajilla", {result});
      res.end()
  });
});

//TablaVeterinario
app.get('/TablaVeterinario', function (req, res) {
  var sql = "SELECT * FROM veterinario";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.render("TablaVeterinario", {result});
      res.end()
  });
});


//VentaAnimal
app.get('/VentaAnimal', function (req, res) {
    res.render("VentaAnimal");
});

app.post('/VentaAnimal', function (req, res) {
    var log=false
    var s="SELECT bovino.id FROM bovino,cliente WHERE bovino.id="+req.body.idBovino+" AND bovino.motivoBaja IS NULL AND  cliente.id="+req.body.idCliente
    var sqlb="UPDATE bovino SET motivoBaja ='Venta', fechaBaja= '"+req.body.fecha+"' "+"WHERE id = "+req.body.idBovino
    var values="("+req.body.idCliente+","+req.body.idBovino+",'"+req.body.fecha+"',"+req.body.peso+","+req.body.valor+")"
    var sqlv="INSERT INTO ventaAnimal (idCliente,idBovino,fechaVenta,peso,valor) VALUES "+values;
    con.query(s, function (er, result) {
      if(er){
        console.log(er)
      }
      else{
        if(result.length>0){
          con.query(sqlb, function (err, res2) {
            if(err){
              console.log(err)
            }
            else{
              log=true
              console.log("1 record updated");
            }
          });
          con.query(sqlv, function (err, res2) {
            if(err){
              console.log(err)
            }
            else{
              log=true
              console.log("1 record updated");
            }
            res.render("VentaAnimal",{log});
            res.end();
          });
        }
        else{
          res.render("VentaAnimal",{log});
          res.end();
        }
      }
    });
});

//VentaPajilla
app.get('/VentaPajilla', function (req, res) {
    res.render("VentaPajilla");
});

app.post('/VentaPajilla', function (req, res) {
    var log=false
    var s="SELECT id FROM pajilla WHERE id="+req.body.idPajilla+" AND disp=1"
    var sqlp="UPDATE pajilla SET disp =0"+"WHERE id = "+req.body.idPajilla
    var values="("+req.body.idCliente+","+req.body.idPajilla+",'"+req.body.fecha+"',"+req.body.valor+")"
    var sqlv="INSERT INTO ventaPajilla (idCliente,idPajilla,fechaVenta,valor) VALUES "+values;
    con.query(s, function (er, result) {
      if(er){
        console.log(er)
      }
      else{
        if(result.length>0){
          con.query(sqlp, function (err, res2) {
            if(err){
              console.log(err)
            }
            else{
              log=true
              console.log("1 record updated");
            }
          });
          con.query(sqlv, function (err, res2) {
            if(err){
              console.log(err)
            }
            else{
              log=true
              console.log("1 record updated");
            }
            res.render("VentaPajilla",{log});
            res.end();
          });
        }
        else{
          res.render("VentaPajilla",{log});
          res.end();
        }
      }
    });
      
});

