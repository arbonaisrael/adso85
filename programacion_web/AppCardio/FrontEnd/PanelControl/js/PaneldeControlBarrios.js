

function listarBarrios() {
    $.post('../../ApiREST/BarriosCtrl/Listar',
        { datos: null },
        function (data) {
            if (data.Estado == 1) {
                $('#barrios_detalles').html('');
                Barrios = data.Barrios;
                $.each(Barrios, function (index, val) {
                    cade = '';
                    cade += '<tr class="white">';
                    cade += '<td>' + val.id_barrio + '</td>';
                    cade += '<td>' + val.nombre + '</td>';
                    cade += '<td class="edit" onclick="EditarBarrio(' + index + ')"><center><span class="glyphicon glyphicon-pencil"></span></center></td>';
                    cade += '</tr>';

                    $('#barrios_detalles').append(cade);
                });
            }
        });
}


$('#agregarBarrio').click(function (event) {
    $('#CrearNuevoBarrio').removeClass('hidden');
    $('#EditarBarrio').addClass('hidden');
});

$('#CancelarCrearBarrio').click(function (event) {
    $('#CrearNuevoBarrio').addClass('hidden');
});

$('#CrearNuevoBarrio').submit(function (event) {
    alerta = '';
    datos = {
        nombre: $('#nombre').val(),
    }
    $.post('../../ApiREST/BarriosCtrl/Registrar',
        { datos: datos },
        function (data) {
            if (data.Estado == 1) {
                alerta = '<div class="alert alert-success alert-dismissible" role="alert">';
                alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                alerta += data.Mensaje + '</div>';
                $('#CrearNuevoBarrio').addClass('hidden');
                listarBarrios();
            } else {
                alerta = '<div class="alert alert-danger alert-dismissible" role="alert">';
                alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                alerta += data.Mensaje + '</div>';
            }

            $('#alertas_barrios').html(alerta);
        }
    );

    return false;
});



function EditarBarrio(index){
	$('#EditarBarrio').removeClass('hidden');
	$('#CrearNuevoBarrio').addClass('hidden');
	

	$('#editbarrio').val(Barrios[index].id_barrio);
	$('#editnombre').val(Barrios[index].nombre);
}

$('#EditarBarrio').submit(function(event) {
		alerta = '';
		datos = {
			id_barrio : $('#editbarrio').val(),
			nombre : $('#editnombre').val(),

		}
		ActualizarBarrio(datos);

		$('#EditarBarrio').addClass('hidden');
		return false;
});

$('#CancelarActualizarBarrio').click(function(event) {
	$('#EditarBarrio').addClass('hidden');
});

function ActualizarBarrio(datos){
	alerta = '';
	$.post('../../ApiREST/BarriosCtrl/Actualizar', 
			{datos: datos}, 
			function(data) {
				if(data.Estado == 1){
					alerta = '<div class="alert alert-success alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
					$('#EditarBarrio').addClass('hidden');
					listarBarrios();
				}else{
					alerta = '<div class="alert alert-danger alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
				}

				$('#alertas_barrios').html(alerta);
			}
		);
}