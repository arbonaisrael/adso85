if(sessionStorage.getItem('user') != null){
    var UsuarioActual = jQuery.parseJSON(sessionStorage.getItem('user'));
    if (UsuarioActual[0].rol > 1){
        $('#contenido').load('pag/menuusuario.html'); 
    } else {
        $('#contenido').load('pag/menu.html');
    }
} else {
    $('#contenido').load('pag/login.html');
}

function Recargar(url){
    location.href = url;
}