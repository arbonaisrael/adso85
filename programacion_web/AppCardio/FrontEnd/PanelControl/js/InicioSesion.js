var UsuarioActual = jQuery.parseJSON(sessionStorage.getItem('user'));

$('#IniciarSesion').click(function(event){
    event.preventDefault();
    alerta ='';
    data = {
        username : $('#luser').val(),
        clave : $('#lpass').val()
    };
    /*
    console.log('ingresamos');
    console.log(data);
    alert(JSON.stringify(data));
    */
    
    $.post('../../ApiREST/UsuariosCtrl/Logear',
    {datos: data},
    function(res){
        if(res.Estado == 1){
            alerta =  '<div class="alert alert-success alert-dismissible" role="alert">';
            alerta += '<button type"button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button>';
            alerta += res.Mensaje + '</div>';
            sessionStorage.setItem('user',JSON.stringify(res.Usuario));
            Recargar('../PanelControl');
        } else {
            alerta =  '<div class="alert alert-danger alert-dismissible" role="alert">';
            alerta += '<button type"button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button>';
            alerta += res.Mensaje + '</div>';
        }
        $('#alertas').html('');
        $('#alertas').append(alerta);
    });
});