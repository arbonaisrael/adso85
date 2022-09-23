function listarMedicamentos(){
	$.post('../../ApiREST/MedicamentosCtrl/Listar',
		{datos: null},
		function(data) {		
			if(data.Estado == 1){
				$('#medicamentos_detalles').html('');
				Medicamentos = data.Medicamento;
				$.each(Medicamentos, function(index, val) {
					cade = '';
					cade += '<tr class="white">';
					cade += '<td>'+val.id_medicamento+'</td>';
					cade += '<td>'+val.nombre+'</td>';
					cade += '<td class="edit" onclick="EditarMedicamento('+index+')"><center><span class="glyphicon glyphicon-pencil"></span></center></td>';
					cade +='</tr>';
					$('#medicamentos_detalles').append(cade);
				});
			}
		}
	);
}

$('#agregarMedicamento').click(function(event) {
	$('#CrearNuevoMedicamento').removeClass('hidden');
	$('#EditarMedicamento').addClass('hidden');
});

$('#CancelarCrearMedicamento').click(function(event) {
	$('#CrearNuevoMedicamento').addClass('hidden');
});

$('#CancelarActualizarMedicamento').click(function(event) {
	$('#EditarMedicamento').addClass('hidden');
});

$('#CrearNuevoMedicamento').submit(function(event) {
		alerta = '';
		datos = {
			id_medicamento : $('#id_medicamento').val(),
			nombre : $('#nommedicamento').val()
		}
		$.post('../../ApiREST/MedicamentosCtrl/Registrar', 
			{datos: datos}, 
			function(data) {
				if(data.Estado == 1){
					alerta = '<div class="alert alert-success alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
					$('#CrearNuevoMedicamento').addClass('hidden');
					listarMedicamentos();
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

function EditarMedicamento(index){
	$('#EditarMedicamento').removeClass('hidden');
	$('#CrearNuevoMedicamento').addClass('hidden');
	
	$('#editmedicamento').val(Medicamentos[index].id_medicamento);
	$('#editnommed').val(Medicamentos[index].nombre);
}

$('#EditarMedicamento').submit(function(event) {
		alerta = '';
		datos = {
			id_medicamento : $('#editmedicamento').val(),
			nombre : $('#editnommed').val()
		}
		ActualizarMedicamento(datos);
		$('#EditarMedicamento').addClass('hidden');
		return false;
});

function ActualizarMedicamento(datos){
	alerta = '';
	$.post('../../ApiREST/MedicamentosCtrl/Actualizar', 
			{datos: datos}, 
			function(data) {
				if(data.Estado == 1){
					alerta = '<div class="alert alert-success alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
					$('#EditarMedicamento').addClass('hidden');
					listarMedicamentos();
				}else{
					alerta = '<div class="alert alert-danger alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
				}

				$('#alertas_medicamentos').html(alerta);
			}
		);
} 