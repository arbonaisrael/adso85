var ControlUsers = false;
var ControlBarrios = false;
var ControlCiudades = false;
var ControlMedicamentos = false;

var ControlPacientes = false;

var UsuarioActual = jQuery.parseJSON(sessionStorage.getItem('user'));

$('#l_usu').val(UsuarioActual[0].Usuario);

$('#CerrarSesion').click(function(event){
    sessionStorage.removeItem('user');
    Recargar("../PanelControl");
});

jQuery(document).ready(function(){
    $('.oculto').hide();
    $('.inf').click(function(){
        var nodo = $(this).attr("href");

        if ($(nodo).is(":visible")){
            $(nodo).hide();
            return false;
        } else {
            $('.oculto').hide("slow");
            $(nodo).fadeToggle("fast");
            return false;
        }
    });
});


$('#ControlPanelUser').click(function(event){
    if(!ControlUsers){
        $('#n_img').addClass('hidden');
        listarUsers();
        ControlUsers = true;
    } else {
        ControlUsers = false;
    }
});

$('#ControlPanelBarrio').click(function(event){
    if(!ControlBarrios){
        $('#n_img').addClass('hidden');
        listarBarrios();
        ControlBarrios = true;
    } else {
        ControlBarrios = false;
    }
});

$('#ControlPanelCiudad').click(function(event){
    if(!ControlCiudades){
        $('#n_img').addClass('hidden');
        listarCiudades();
        ControlCiudades = true;
    } else {
        ControlCiudades = false;
    }
});

$('#ControlPanelMedicamento').click(function(event){
    if(!ControlMedicamentos){
        $('#n_img').addClass('hidden');
        listarMedicamentos();
        ControlMedicamentos = true;
    } else {
        ControlMedicamentos = false;
    }
});

$('#ControlPanelPaciente').click(function(event) {
	if(!ControlPacientes){
        $('#n_img').addClass('hidden');
		listarPacientes();
		ControlPacientes = true;
	}else{
		ControlPacientes = false;
	}
});





jQuery(document).ready(function(){
    $('.date').datetimepicker({
        format: 'YYYY-MM-DD'
    });
});
