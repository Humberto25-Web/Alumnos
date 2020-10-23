
firebase.initializeApp({
    apiKey: "AIzaSyAUaIO1-1cShBikfhL5mOZn93hZD97psUM",
    authDomain: "crud-web-b00a7.firebaseapp.com",
    projectId: "crud-web-b00a7"
});

var db = firebase.firestore();

function guardar() {
    var matricula = document.getElementById('matricula').value;
    var nombre = document.getElementById('nombre').value;
    var edad = document.getElementById('edad').value;
    var promedio = document.getElementById('promedio').value;

    if (!matricula == "" && !nombre == "" && !edad == "" && !promedio == "") {


        for (var i = 0; i < document.form1.sexo.length; i++) {
            if (document.form1.sexo[i].checked) {
                genero = document.form1.sexo[i].value;

            }
        }

        if (genero == "Hombre") {
            db.collection("AlumnosHombres").add({
                matricula: matricula,
                nombre: nombre,
                edad: edad,
                sexo: genero,
                promedio: promedio
            })
                .then(function (docRef) {
                    alert("Datos guardados con exto!! ");
                })
                .catch(function (error) {
                    alert("Error adding document: ", error);
                });

        } else {

            db.collection("AlumnosMujeres").add({
                matricula: matricula,
                nombre: nombre,
                edad: edad,
                sexo: genero,
                promedio: promedio
            })
                .then(function (docRef) {
                    alert("Datos guardados con exito!!");
                })
                .catch(function (error) {
                    alert("Error adding document: ", error);
                });

        }

    } else {
        alert("Hay campos vacios verifica antes de guardar.!!");
    }

}
cont = 0;
contH = 0;
sumatoriaProm = 0;
contM = 0;
sumProM = 0;
//Leer Datos Hombre.
var tablaHombres = document.getElementById('tablaHombres');

db.collection("AlumnosHombres").onSnapshot((querySnapshot) => {

    tablaHombres.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().matricula}`);

        tablaHombres.innerHTML += `
        <tr>
       
        <th scope="col">${doc.data().matricula}</th>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().edad}</td>
        <td>${doc.data().sexo}</td>
        <td>${doc.data().promedio}</td>
        <td><button class="btn btn-danger" onclick="eliminarHombres('${doc.id}')"><span><i class="fas fa-trash-alt"></i></span></button></td>
        <td><button class="btn btn-warning" onclick="modificarHombres('${doc.id}','${doc.data().matricula}','${doc.data().nombre}','${doc.data().edad}','${doc.data().promedio}')"><span><i class="fas fa-edit"></i></span></button></td>
      </tr>
        `
        promedio = parseFloat(doc.data().promedio);
        sumatoriaProm = sumatoriaProm + promedio;
        contH++;
        cont++;

    });
    promH = sumatoriaProm / contH;
    totalPromH=promH.toFixed(2);
    document.getElementById('totalHombres').innerHTML = "Total de alumnos Hombres: " + contH;
    document.getElementById('promedioHombres').innerHTML = "Promedio de Hombres: " + totalPromH;
});


//Modificar Hombres
function modificarHombres(id, matricula, nombre, edad, promedio) {
    //Se envian los datos de la tabla al formulario para poder editarlos
    document.getElementById('matricula').value = matricula;
    document.getElementById('nombre').value = nombre;
    document.getElementById('edad').value = edad;
    document.getElementById('promedio').value = promedio;
    var boton = document.getElementById('btnGuardar');
    boton.innerHTML = 'Actualizar Datos';

    boton.onclick = function () {
        var washingtonRef = db.collection("AlumnosHombres").doc(id);

        var matricula = document.getElementById('matricula').value;
        var nombre = document.getElementById('nombre').value;
        var edad = document.getElementById('edad').value;
        var promedio = document.getElementById('promedio').value;
        for (var i = 0; i < document.form1.sexo.length; i++) {
            if (document.form1.sexo[i].checked) {
                genero = document.form1.sexo[i].value;

            }
        }
        return washingtonRef.update({
            matricula: matricula,
            nombre: nombre,
            edad: edad,
            sexo: genero,
            promedio: promedio
        })
            .then(function () {
                alert("Registro modificado con exito!");
                boton.innerHTML = "Guardar Registro";
            })
            .catch(function (error) {
                alert("Error al actualizar datos: ", error);
            });
    }


}


//Borrar Hombres
function eliminarHombres(id) {
    db.collection("AlumnosHombres").doc(id).delete().then(function () {
        alert("Resgitros eliminado con exito");
    }).catch(function (error) {
        alert("Error al eliminar el registro!!!");
    });

}

//Leer Datos Mujeres.
var tablaMujeres = document.getElementById('tablaMujeres');

db.collection("AlumnosMujeres").onSnapshot((querySnapshot) => {

    tablaMujeres.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().matricula}`);

        tablaMujeres.innerHTML += `
        <tr>
       
        <th scope="col">${doc.data().matricula}</th>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().edad}</td>
        <td>${doc.data().sexo}</td>
        <td>${doc.data().promedio}</td>
        <td><button class="btn btn-danger" onclick="eliminarMujeres('${doc.id}')"><span><i class="fas fa-trash-alt"></i></span></button></td>
        <td><button class="btn btn-warning" onclick="modificarMujeres('${doc.id}','${doc.data().matricula}','${doc.data().nombre}','${doc.data().edad}','${doc.data().promedio}')"><span><i class="fas fa-edit"></i></span></button></td>
      </tr>
        `
        promedio = parseFloat(doc.data().promedio);
        sumatoriaProm = sumatoriaProm + promedio;
        cont++;
        sumProM = sumProM + promedio;
        contM++;
    });

    promM = sumProM / contM;
    promedioTotal = sumatoriaProm / cont;
    total = promedioTotal.toFixed(2);
    totalPromM = promM.toFixed(2);
    document.getElementById('totalM').innerHTML = "Total de Mujeres: " + contM;
    document.getElementById('promM').innerHTML = "Promedio de Mujeres: " + totalPromM;
    document.getElementById('prom').innerHTML = "Promedio general del grupo: " + total;
    document.getElementById('total').innerHTML = "Total de alumnos: " + cont;
    //Variables que traen los resultados de los hombres
    h = contH;
    a = promH;
    
        //Se crean las graficas
        var lienzo = document.getElementById('graficaTotales');
        var chart = new Chart(lienzo, {
            type: "bar",
            data: {
                labels: ["Total Alumnos", "Total Mujeres", "Total Hombres"],
                datasets: [{
                    label: "Alumnos",
                    backgroundColor: "rgb(30, 188, 254 )",
                    data: [cont, contM, h, 0]
                }
                ]
            }
        });
        var lienzo = document.getElementById('graficaPromedios');
        var chart = new Chart(lienzo, {
            type: "bar",
            data: {
                labels: ["Promedio Hombres", "Promedio Mujeres", "Promedio General"],
                datasets: [{
                    label: "Promedios",
                    backgroundColor: "rgb(7, 186, 52)",
                    data: [a, totalPromM, total, 30]
                }
                ]
            }
        });
    
});


//Metodos buscar

//Buscar por nombre Mujeres.
function buscar() {
    var nombreBuscar = document.getElementById('buscar').value;
    //Buscar en tabla de Mujeres
    db.collection("AlumnosMujeres").where("nombre", "==", nombreBuscar)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                // alert("Nombre: "+doc.data().nombre+", Edad: "+doc.data().edad+", Sexo: "+doc.data().sexo+", Promedio: "+doc.data().promedio);
                tablaMujeres.innerHTML = `
        <tr>
       
        <th scope="col">${doc.data().matricula}</th>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().edad}</td>
        <td>${doc.data().sexo}</td>
        <td>${doc.data().promedio}</td>
        <td><button class="btn btn-danger" onclick="eliminarMujeres('${doc.id}')"><span><i class="fas fa-trash-alt"></i></span></button></td>
        <td><button class="btn btn-warning" onclick="modificarMujeres('${doc.id}','${doc.data().matricula}','${doc.data().nombre}','${doc.data().edad}','${doc.data().promedio}')"><span><i class="fas fa-edit"></i></span></button></td>
      </tr>
        `
            });
        })
        .catch(function (error) {
            alert("Error el dato no existe: ", error);
        });

    //Buscar por matricula Mujeres
    db.collection("AlumnosMujeres").where("matricula", "==", nombreBuscar)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                // alert("Nombre: "+doc.data().nombre+", Edad: "+doc.data().edad+", Sexo: "+doc.data().sexo+", Promedio: "+doc.data().promedio);
                tablaMujeres.innerHTML = `
                 <tr>
                 <th scope="col">${doc.data().matricula}</th>
                 <td>${doc.data().nombre}</td>
                 <td>${doc.data().edad}</td>
                 <td>${doc.data().sexo}</td>
                 <td>${doc.data().promedio}</td>
                 <td><button class="btn btn-danger" onclick="eliminarHombres('${doc.id}')"><span><i class="fas fa-trash-alt"></i></span></button></td>
                 <td><button class="btn btn-warning" onclick="modificarHombres('${doc.id}','${doc.data().matricula}','${doc.data().nombre}','${doc.data().edad}','${doc.data().promedio}')"><span><i class="fas fa-edit"></i></span></button></td>
                 </tr>
                      `
            });
        })
        .catch(function (error) {
            console.log("El dato no existe");
            alert("Error el dato no existe ", error);
        });

    //Buscar por nombre En tabla de hombres
    db.collection("AlumnosHombres").where("nombre", "==", nombreBuscar)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                // alert("Nombre: "+doc.data().nombre+", Edad: "+doc.data().edad+", Sexo: "+doc.data().sexo+", Promedio: "+doc.data().promedio);
                tablaHombres.innerHTML = `
                    <tr>
                    <th scope="col">${doc.data().matricula}</th>
                    <td>${doc.data().nombre}</td>
                    <td>${doc.data().edad}</td>
                    <td>${doc.data().sexo}</td>
                    <td>${doc.data().promedio}</td>
                    <td><button class="btn btn-danger" onclick="eliminarHombres('${doc.id}')"><span><i class="fas fa-trash-alt"></i></span></button></td>
                    <td><button class="btn btn-warning" onclick="modificarHombres('${doc.id}','${doc.data().matricula}','${doc.data().nombre}','${doc.data().edad}','${doc.data().promedio}')"><span><i class="fas fa-edit"></i></span></button></td>
                    </tr>
                         `
            });
        })
        .catch(function (error) {
            console.log("El dato no existe");
            alert("Error el dato no existe ", error);
        });

    //Buscar por matricula en tabla de Hombres
    db.collection("AlumnosHombres").where("matricula", "==", nombreBuscar)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                // alert("Nombre: "+doc.data().nombre+", Edad: "+doc.data().edad+", Sexo: "+doc.data().sexo+", Promedio: "+doc.data().promedio);
                tablaHombres.innerHTML = `
                    <tr>
                    <th scope="col">${doc.data().matricula}</th>
                    <td>${doc.data().nombre}</td>
                    <td>${doc.data().edad}</td>
                    <td>${doc.data().sexo}</td>
                    <td>${doc.data().promedio}</td>
                    <td><button class="btn btn-danger" onclick="eliminarHombres('${doc.id}')"><span><i class="fas fa-trash-alt"></i></span></button></td>
                    <td><button class="btn btn-warning" onclick="modificarHombres('${doc.id}','${doc.data().matricula}','${doc.data().nombre}','${doc.data().edad}','${doc.data().promedio}')"><span><i class="fas fa-edit"></i></span></button></td>
                    </tr>
                         `
            });
        })
        .catch(function (error) {
            console.log("El dato no existe");
            alert("Error el dato no existe ", error);
        });
}

//Metodo Modificar

//Modificar Mujeres
function modificarMujeres(id, matricula, nombre, edad, promedio) {
    //Se envian los datos de la tabla al formulario para poder editarlos
    document.getElementById('matricula').value = matricula;
    document.getElementById('nombre').value = nombre;
    document.getElementById('edad').value = edad;
    document.getElementById('promedio').value = promedio;
    var boton = document.getElementById('btnGuardar');
    boton.innerHTML = 'Actualizar Datos';

    boton.onclick = function () {
        var washingtonRef = db.collection("AlumnosMujeres").doc(id);

        var matricula = document.getElementById('matricula').value;
        var nombre = document.getElementById('nombre').value;
        var edad = document.getElementById('edad').value;
        var promedio = document.getElementById('promedio').value;
        for (var i = 0; i < document.form1.sexo.length; i++) {
            if (document.form1.sexo[i].checked) {
                genero = document.form1.sexo[i].value;

            }
        }
        return washingtonRef.update({
            matricula: matricula,
            nombre: nombre,
            edad: edad,
            sexo: genero,
            promedio: promedio
        })
            .then(function () {
                alert("Registro modificado con exito!");
                boton.innerHTML = "Guardar Registro";
            })
            .catch(function (error) {
                alert("Error al modificar ", error);
            });
    }


}


//Borrar Mujeres
function eliminarMujeres(id) {
    db.collection("AlumnosMujeres").doc(id).delete().then(function () {
        alert("Resgitros eliminado con exito");
    }).catch(function (error) {
        alert("Error al eliminar el registro!!!");
    });
}


//Metodo Actualizar pagina 
function actualizar() {
    location.reload();
}

//Generar pdf
function pdf(){
    var contenido= document.getElementById('allHtml');
    html2pdf()
    .set({
        margin:0.2,
        filename: "Reporte Alumnos CRUD",
        jsPDF:{
            unit: "in",
            format: "a3",
            orientation: "portrait"
        }
    })
    .from(contenido)
    .save();
}
