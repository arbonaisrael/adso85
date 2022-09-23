function listarCiudades(){
	$.post('../../ApiREST/CiudadesCtrl/Listar',
		{datos: null},
		function(data) {		
			if(data.Estado == 1){
				$('#ciudades_detalles').html('');
				Ciudades = data.Ciudad;
				$.each(Ciudades, function(index, val) {
					cade = '';
					cade += '<tr class="white">';
					cade += '<td>'+val.id_ciudad+'</td>';
					cade += '<td>'+val.nombre+'</td>';
					cade += '<td class="edit" onclick="EditarCiudad('+index+')"><center><span class="glyphicon glyphicon-pencil"></span></center></td>';
					cade +='</tr>';
					$('#ciudades_detalles').append(cade);
				});
			}
		}
	);
}

$('#agregarCiudad').click(function(event) {
	$('#CrearNuevoCiudad').removeClass('hidden');
	$('#EditarCiudad').addClass('hidden');
});

$('#CancelarCrearCiudad').click(function(event) {
	$('#CrearNuevoCiudad').addClass('hidden');
});

$('#CancelarActualizarCiudad').click(function(event) {
	$('#EditarCiudad').addClass('hidden');
});

$('#CrearNuevoCiudad').submit(function(event) {
		alerta = '';
		datos = {
			id_ciudad : $('#ciu').val(),
			nombre : $('#nom').val()
		}
		$.post('../../ApiREST/CiudadesCtrl/Registrar', 
			{datos: datos}, 
			function(data) {
				if(data.Estado == 1){
					alerta = '<div class="alert alert-success alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
					$('#CrearNuevoCiudad').addClass('hidden');
					listarCiudades();
				}else{
					alerta = '<div class="alert alert-danger alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
				}

				$('#alertas_ciudades').html(alerta);
			}
		);
		return false;
});



function EditarCiudad(index){
	$('#EditarCiudad').removeClass('hidden');
	$('#CrearNuevoCiudad').addClass('hidden');
	
	$('#editciudad').val(Ciudades[index].id_ciudad);
	$('#editnomciu').val(Ciudades[index].nombre);
}

$('#EditarCiudad').submit(function(event) {
		alerta = '';
		datos = {
			id_ciudad : $('#editciudad').val(),
			nombre : $('#editnomciu').val()
		}
		ActualizarCiudad(datos);
		$('#EditarCiudad').addClass('hidden');
		return false;
});

function ActualizarCiudad(datos){
	alerta = '';
	$.post('../../ApiREST/CiudadesCtrl/Actualizar', 
			{datos: datos}, 
			function(data) {
				if(data.Estado == 1){
					alerta = '<div class="alert alert-success alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
					$('#EditarBarrio').addClass('hidden');
					listarCiudades();
				}else{
					alerta = '<div class="alert alert-danger alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
				}

				$('#alertas_ciudades').html(alerta);
			}
		);
} 



