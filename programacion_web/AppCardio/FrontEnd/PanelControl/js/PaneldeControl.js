var ControlUsers = false;
var ControlBarrios = false;
var ControlCiudades = false;
var ControlMedicamentos = false;

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
