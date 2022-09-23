function listarUsers(){
    $.post('../../ApiREST/UsuariosCtrl/Listar',
    {datos: null},
    function(data){
        if(data.Estado == 1){
            $('#usuarios_detalles').html('');
            Usuarios = data.Usuarios;
            $.each(Usuarios,function(index,val){
                cade = '';
                cade += '<tr class="white">';
                cade += '<td>'+val.usuario+'</td>';
                if(val.rol == 1) {
                    cade += '<td>Super Administrador</td>';
                } else {
                    cade += '<td>Administrador</td>';
                }
                    
                if(val.estado == 1) {
                    cade += '<td class="edit" onclick="DesactivarUser('+index+')"><span class="glyphicon glyphicon-ok"></span> Activo</td>';
                } else {
                    cade += '<td class="edit" onclick="ActivarUser('+index+')"><span class="glyphicon glyphicon-remove"></span> Inactivo</td>';
                }
                 cade += '<td class="edit" onclick="EditarUser('+index+')"><center><span class="glyphicon glyphicon-pencil"></span></center></td>';
                cade +='</tr>';
					
                $('#usuarios_detalles').append(cade);
            });
        }
    });
}

$('#agregarUser').click(function(event) {
	$('#CrearNuevoUser').removeClass('hidden');
	$('#EditarUser').addClass('hidden');
});

$('#CancelarCrearUser').click(function(event) {
	$('#CrearNuevoUser').addClass('hidden');
});

$('#CrearNuevoUser').submit(function(event) {
	if(!($('#user').val() == '' || $('#pass').val() == '' )){
		alerta = '';
		datos = {
			username : $('#user').val(),
			clave : $('#pass').val(),
			estado : $('#estado').val(),
			rol : $('#rol').val()
		}
		$.post('../../ApiREST/UsuariosCtrl/Registrar', 
			{datos: datos}, 
			function(data) {
				if(data.Estado == 1){
					alerta = '<div class="alert alert-success alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
					$('#CrearNuevoUser').addClass('hidden');
					listarUsers();
				}else{
					alerta = '<div class="alert alert-danger alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
				}

				$('#alertas_usuarios').html(alerta);
			}
		);
		return false;
	}
});

function EditarUser(index){
	$('#EditarUser').removeClass('hidden');
	$('#CrearNuevoUser').addClass('hidden');
	

	$('#edituser').val(Usuarios[index].usuario);
	$('#editpass').val(Usuarios[index].clave);
	$('#editrol').val(Usuarios[index].rol);
	$('#editestado').val(Usuarios[index].estado);
}

$('#EditarUser').submit(function(event) {
	if(!($('#edituser').val() == '' || $('#editpass').val() == '' )){
		alerta = '';
		datos = {
			username : $('#edituser').val(),
			clave : $('#editpass').val(),
			estado : $('#editestado').val(),
			rol : $('#editrol').val()
		}
		ActualizarUser(datos);

		$('#EditarUser').addClass('hidden');
		return false;
	}
});

$('#CancelarActualizarUser').click(function(event) {
	$('#EditarUser').addClass('hidden');
});

function DesactivarUser (index){
	datos = {
		username : Usuarios[index].usuario,
		clave : Usuarios[index].clave,
		estado : 2,
		rol : Usuarios[index].rol
	}
	ActualizarUser(datos);
}

function ActivarUser(index) {
	datos = {
		username : Usuarios[index].usuario,
		clave : Usuarios[index].clave,
		estado : 1,
		rol : Usuarios[index].rol
	}
	ActualizarUser(datos);
}

function ActualizarUser(datos){
	alerta = '';
	$.post('../../ApiREST/UsuariosCtrl/Actualizar', 
			{datos: datos}, 
			function(data) {
				if(data.Estado == 1){
					alerta = '<div class="alert alert-success alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
					$('#CrearNuevoUser').addClass('hidden');
					listarUsers();
				}else{
					alerta = '<div class="alert alert-danger alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.Mensaje+'</div>';
				}

				$('#alertas_usuarios').html(alerta);
			}
		);
}