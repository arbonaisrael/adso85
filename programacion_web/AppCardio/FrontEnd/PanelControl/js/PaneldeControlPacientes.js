
function listarPacientes(){
	$.post('../../ApiREST/PacientesCtrl/Listar',
		{datos: null},
		function(data) {
			if(data.Estado == 1){
				$('#pacientes_detalles').html('');
				Pacientes = data.Pacientes;
				$.each(Pacientes, function(index, val) {
					cade = '';
					cade += '<tr class="white">';
					cade += '<td>'+val.id_cedula+'</td>';
					cade += '<td>'+val.nombres+'</td>';
					cade += '<td>'+val.apellidos+'</td>';
					cade += '<td>'+val.fec_nac+'</td>';
					cade += '<td>'+val.edad+'</td>';
					cade += '<td>'+val.genero+'</td>';
					cade += '<td>'+val.telefono+'</td>';
					cade += '<td>'+val.direccion+'</td>';
					cade += '<td>'+val.nombarrio+'</td>';
					cade += '<td>'+val.nomciudad+'</td>';
					cade += '<td>'+val.tp_paciente+'</td>';
					cade += '<td>'+val.seguridad_social+'</td>';
					cade += '<td class="edit" onclick="EditarPaciente('+index+')"><center><span class="glyphicon glyphicon-pencil"></span></center></td>';
					cade +='</tr>';
					$('#pacientes_detalles').append(cade);
				});
			}
		}
	);
}

$('#CancelarCrearPaciente').click(function(event) {
	$('#CrearNuevoPaciente').addClass('hidden');
});

$('#CancelarActualizarPaciente').click(function(event) {
	$('#EditarPaciente').addClass('hidden');
});


$('#agregarPaciente').click(function(event) {
	$('#CrearNuevoPaciente').removeClass('hidden');
	$('#EditarPaciente').addClass('hidden');

	$.post('../../ApiREST/BarriosCtrl/Listar',
		{datos: null},
		function(data) {
			if(data.Estado == 1){
				$('#npbarrio').html('');
				Barrios = data.Barrios;
				$.each(Barrios, function(index, val) {
						cade = '';
						cade += '<option value="'+val.id_barrio+'">'+val.nombre+'</option>';
						$('#npbarrio').append(cade);
				});
			}
		}
	);

	
    $.post('../../ApiREST/CiudadesCtrl/Listar',
		{datos: null},
		function(data) {		
			if(data.Estado == 1){
				$('#npciudad').html('');
				Ciudades = data.Ciudad;
				$.each(Ciudades, function(index, val) {
						cade = '';
						cade += '<option value="'+val.id_ciudad+'">'+val.nombre+'</option>';
						$('#npciudad').append(cade);
				});
			}
		}
	);

});

$('#CrearNuevoPaciente').submit(function(event) {
	    alerta = '';
		datos = {
			id_cedula : $('#npcedula').val(),
			nombres : $('#npnombres').val(),
			apellidos : $('#npapellidos').val(),
			fec_nac : $('#npfec_nac').val(),
			edad : $('#npedad').val(),
			genero : $('#npgenero').val(),
			telefono : $('#nptelefono').val(),
			direccion : $('#npdireccion').val(),
			id_barrio : $('#npbarrio').val(),
			id_ciudad : $('#npciudad').val(),
			tp_paciente : $('#nptp_paciente').val(),
			seguridad_social : $('#npseguridad_social').val()
		}

		$.post('../../ApiREST/PacientesCtrl/Registrar', 
			{datos: datos}, 
			function(data) {
				if(data.Estado == 1){
					alerta = '<div class="alert alert-success alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
					$('#CrearNuevoPaciente').addClass('hidden');
					listarPacientes();
				}else{
					alerta = '<div class="alert alert-danger alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
				}

				$('#alertas_pacientes').html(alerta);
			}
		);	
		return false;
});

function EditarPaciente(index){
	$('#EditarPaciente').removeClass('hidden');
	$('#CrearNuevoPaciente').addClass('hidden');

	$.post('../../ApiREST/BarriosCtrl/Listar',
		{datos: null},
		function(data) {
			if(data.Estado == 1){
				$('#epbarrio').html('');
				Barrios = data.Barrios;
				$.each(Barrios, function(index, val) {
						cade = '';
						cade += '<option value="'+val.id_barrio+'">'+val.nombre+'</option>';
						$('#epbarrio').append(cade);
				});
			}
		}
	);

	
    $.post('../../ApiREST/CiudadesCtrl/Listar',
		{datos: null},
		function(data) {		
			if(data.Estado == 1){
				$('#epciudad').html('');
				Ciudades = data.Ciudad;
				$.each(Ciudades, function(index, val) {
						cade = '';
						cade += '<option value="'+val.id_ciudad+'">'+val.nombre+'</option>';
						$('#epciudad').append(cade);
				});
			}
		}
	);


	$('#epcedula').val(Pacientes[index].id_cedula);
	$('#epnombres').val(Pacientes[index].nombres);
	$('#epapellidos').val(Pacientes[index].apellidos);
	$('#epfec_nac').val(Pacientes[index].fec_nac);
	$('#epedad').val(Pacientes[index].edad);
	$('#epgenero').val(Pacientes[index].genero);
    $('#eptelefono').val(Pacientes[index].telefono);
	$('#epdireccion').val(Pacientes[index].direccion);
	$('#epbarrio').val(Pacientes[index].id_barrio);
	$('#epciudad').val(Pacientes[index].id_ciudad);
	$('#eptp_paciente').val(Pacientes[index].tp_paciente);
	$('#epseguridad_social').val(Pacientes[index].seguridad_social);
	
}

$('#EditarPaciente').submit(function(event) {
		alerta = '';
		datos = {
			id_cedula : $('#epcedula').val(),
			nombres : $('#epnombres').val(),
			apellidos : $('#epapellidos').val(),
			fec_nac : $('#epfec_nac').val(),
			edad : $('#epedad').val(),
			genero : $('#epgenero').val(),
			telefono : $('#eptelefono').val(),
			direccion : $('#epdireccion').val(),
			id_barrio : $('#epbarrio').val(),
			id_ciudad : $('#epciudad').val(),
			tp_paciente : $('#eptp_paciente').val(),
			seguridad_social : $('#epseguridad_social').val()
		}
		ActualizarPaciente(datos);
		$('#EditarPaciente').addClass('hidden');
		return false;
});

function ActualizarPaciente(datos){
	alerta = '';
	$.post('../../ApiREST/PacientesCtrl/Actualizar', 
			{datos: datos}, 
			function(data) {
				if(data.Estado == 1){
					alerta = '<div class="alert alert-success alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
					$('#EditarPaciente').addClass('hidden');
					listarPacientes();
				}else{
					alerta = '<div class="alert alert-danger alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
				}

				$('#alertas_pacientes').html(alerta);
			}
		);
} 
