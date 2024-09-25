function ObtenerClientes() {
    fetch('https://localhost:7245/Clientes')
    .then(response => response.json())
    .then(data => MostrarClientes(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function MostrarClientes(data) {
    let tbody = document.getElementById('todosLosClientes');
    tbody.innerHTML = '';

    data.forEach(element => {
        let tr = tbody.insertRow();

        let td0 = tr.insertCell(0);
        let tdIdCliente = document.createTextNode(element.id);
        td0.appendChild(tdIdCliente);

        let td1 = tr.insertCell(1);
        let tdNombreCliente = document.createTextNode(element.nombreCliente);
        td1.appendChild(tdNombreCliente);

        let td2 = tr.insertCell(2);
        let tdApellidoCliente = document.createTextNode(element.apellidoCliente);
        td2.appendChild(tdApellidoCliente);

        let td3 = tr.insertCell(3);
        let tdDni = document.createTextNode(element.dni);
        td3.appendChild(tdDni);

        let td4 = tr.insertCell(4);
        let tdSaldo = document.createTextNode(element.saldo);
        td4.appendChild(tdSaldo);

        
        let btnEditar = document.createElement('button');
        btnEditar.innerText = 'Modificar';
        btnEditar.setAttribute('class', 'btn btn-info');
        btnEditar.setAttribute('onclick', `BuscarClienteId(${element.id})`);
        let td5 = tr.insertCell(5);
        td5.appendChild(btnEditar);

        let btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.setAttribute('class', 'btn btn-danger');
        btnEliminar.setAttribute('onclick', `EliminarCliente(${element.id})`);
        let td6 = tr.insertCell(6);
        td6.appendChild(btnEliminar);
    });
}


function CrearCliente() {
    var nombreCliente = document.getElementById("NombreCliente").value;
    if (nombreCliente == "" || nombreCliente == null || /[^a-zA-Z\s]/.test(nombreCliente)) 
        {
        return mensajesError('#error', null, "Por favor ingrese un Nombre.");
        }
    var apellidoCliente = document.getElementById("ApellidoCliente").value;
    if (apellidoCliente == "" || apellidoCliente == null || /[^a-zA-Z\s]/.test(apellidoCliente)) 
        {
        return mensajesError('#error', null, "Por favor ingrese un Apellido.");
        }
    var dni = document.getElementById("Dni").value;
    if (dni == "" || dni == null || !/^\d{8}$/.test(dni)) 
        {
        return mensajesError('#error', null, "Por favor ingrese un DNI válido de 8 dígitos.");
        }
    var saldo = document.getElementById("Saldo").value;
    if (saldo == "" || saldo == null) 
        {
        return mensajesError('#error', null, "Por favor ingrese un saldo positivo.");
        }

    let cliente = {
        nombreCliente: document.getElementById("NombreCliente").value,
        apellidoCliente: document.getElementById("ApellidoCliente").value,
        dni: document.getElementById("Dni").value,
        saldo: document.getElementById("Saldo").value,
    };

    fetch('https://localhost:7245/Clientes',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(cliente)
        }
    )
    .then(response => response.json())
    .then(data =>{
        if(data.status == undefined){
            document.getElementById("NombreCliente").value = "";
            document.getElementById("ApellidoCliente").value = "";
            document.getElementById("Dni").value = 0;
            document.getElementById("Saldo").value = 0;

            $('#modalAgregarClientes').modal('hide');
            ObtenerClientes();
         } else {
             mensajesError('#error', data);
         }
            
    })
    .catch(error => console.log("Hubo un error al guardar el Cliente nuevo, verifique el mensaje de error: ", error))
}


function EliminarCliente(id) {
    var siElimina = confirm("¿Esta seguro de borrar este cliente?.")
    if (siElimina == true) {
        EliminarSi(id);
    }
}

function EliminarSi(id) {
    fetch(`https://localhost:7245/Clientes/${id}`,
    {
        method: "DELETE"
    })
    .then(() => {
        ObtenerClientes();
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}


function BuscarClienteId(id) {
    fetch(`https://localhost:7245/Clientes/${id}`,{
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("IdCliente").value = data.id;
        document.getElementById("NombreClienteEditar").value = data.nombreCliente;
        document.getElementById("ApellidoClienteEditar").value = data.apellidoCliente;
        document.getElementById("DniEditar").value = data.dni;
        document.getElementById("SaldoEditar").value = data.saldo;

        $('#modalEditarClientes').modal('show');
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
}


function EditarCliente() {
    let idCliente = document.getElementById("IdCliente").value;

    var nombreCliente = document.getElementById("NombreClienteEditar").value;
    if (nombreCliente == "" || nombreCliente == null || /[^a-zA-Z\s]/.test(nombreCliente)) 
        {
        return mensajesError('#errorEditar', null, "Por favor ingrese un Nombre.");
        }
    var apellidoCliente = document.getElementById("ApellidoClienteEditar").value;
    if (apellidoCliente == "" || apellidoCliente == null || /[^a-zA-Z\s]/.test(apellidoCliente)) 
        {
        return mensajesError('#errorEditar', null, "Por favor ingrese un Apellido.");
        }
    var dni = document.getElementById("DniEditar").value;
    if (dni == "" || dni == null || !/^\d{8}$/.test(dni)) 
        {
        return mensajesError('#errorEditar', null, "Por favor ingrese un DNI válido de 8 dígitos.");
        }
    var saldo = document.getElementById("SaldoEditar").value;
    if (saldo == "" || saldo == null || parseFloat(saldo) < 0) 
        {
        return mensajesError('#errorEditar', null, "Por favor ingrese un saldo positivo.");
        }

    let editarCliente = {
        id: idCliente,
        nombreCliente: document.getElementById("NombreClienteEditar").value,
        apellidoCliente: document.getElementById("ApellidoClienteEditar").value,
        dni: document.getElementById("DniEditar").value,
        saldo: document.getElementById("SaldoEditar").value
    }

    fetch(`https://localhost:7245/Clientes/${idCliente}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editarCliente)
    })
    .then(data => {
        if (data.status == undefined || data.status == 204) {

            document.getElementById("IdCliente").value = 0;
            document.getElementById("NombreClienteEditar").value = "";
            document.getElementById("ApellidoClienteEditar").value = 0;
            document.getElementById("DniEditar").value = 0;
            document.getElementById("SaldoEditar").value = 0;
            $('#modalEditarClientes').modal('hide');
            ObtenerClientes();
        }
        else {
            mensajesError('#errorEditar', data);
        }
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}


function mensajesError(id, data, mensaje) {
    $(id).empty();
    if (data != null) {
        $.each(data.errors, function(Index, item) {
            $(id).append(
                "<ol>",
                "<li>" + item + "</li>",
                "</ol>"
            )
        })
    }
    else{
        $(id).append(
            "<ol>",
            "<li>" + mensaje + "</li>",
            "</ol>"
        )
    }
   
    $(id).attr("hidden", false);
}