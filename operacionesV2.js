const fs = require("fs");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function pause() {
    rl.question("Presione una tecla para continuar...", () => {
        menu()
    })
}

function menu() {
    console.log("Bienvenido al menú")
    console.log("1. Opción 1 Registrar Paciente")
    console.log("2. Opción 2 Ver Pacientes")
    console.log("3. Salir")

    rl.question("Ingrese una opción: ", function (opcion) {
        switch (opcion) {
            case "1":
                console.log("Ha seleccionado la opción de registrar")
                // Aqui comienza el llback anidado de valores para registro de paciente
                rl.question("Ingrese el nombre del paciente: ", function (nombre) {
                    rl.question("Ingrese la edad del paciente: ", function (edad) {
                        rl.question("Ingrese el animal del paciente: ", function (animal) {
                            rl.question("Ingrese el color del paciente: ", function (color) {
                                rl.question("Ingrese la enfermedad del paciente: ", function (enfermedad) {
                                    // Creamos el objeto paciente con los datos ingresados
                                    const paciente = {
                                        nombre,
                                        edad,
                                        animal,
                                        color,
                                        enfermedad
                                    }
                                    registrar(paciente)

                                    menu()
                                    // Y aqui se resuelve el Callback con la llamada a la ultima funcion "menu()"
                                })
                            })
                        })
                    })
                })
                break

            case "2":
                console.log("Ha seleccionado la opción 2")
                // Aquí puedes agregar la lógica correspondiente a la opción 2
                leer()
                break

            case "3":
                console.log("Ha seleccionado la opción de salir")
                rl.close()
                break

            default:
                console.log("Opción inválida, por favor ingrese una opción válida.")
                menu()
                break
        }
    });
}

function registrar(paciente) {
    // Leer el contenido del archivo citas.json
    const citasJSON = fs.readFileSync("citas.json")

    // Convertir el contenido de citas.json en un objeto JavaScript
    const citas = JSON.parse(citasJSON)

    // Agregar el nuevo paciente al arreglo de citas
    citas.push(paciente)

    // Convertir el objeto JavaScript actualizado a STRING
    const citasJSONActualizado = JSON.stringify(citas, null, 2)

    // Guardar el JSON actualizado en el archivo citas.json
    fs.writeFileSync("citas.json", citasJSONActualizado)
}

function leer() {
    // Leer el contenido del archivo citas.json
    const citasJSON = fs.readFileSync("citas.json")

    // Convertir el contenido de citas.json en un objeto JavaScript
    const convertirCitasAJSON = JSON.parse(citasJSON)

    // Guardamos un arreglo de objetos con el formato que queramos
    const pacientes = convertirCitasAJSON.map((paciente, numero) => {
        return {
            "Paciente": numero + 1,
            "Nombre": paciente.nombre,
            "Edad": paciente.edad,
            "Animal": paciente.animal,
            "Color": paciente.color,
            "Enfermedad": paciente.enfermedad
        }
    })

    // Imprimimos el resultado en formato de tabla
    console.table(convertirCitasAJSON)
    pause()
}


module.exports = { registrar, leer, menu };