$(document).ready(function(){

    /*
    $('#tabla_pr_tabla').dataTable({
        "bProcessing": true,
        "sAjaxSource":'consulta/cPr_Tabla.php',
        "aoColumns": [
            {mData:'id'},
            {mData:'nombre'},
            {mData:'pr_apellido'},
            {mData:'sg_apellido'},
            {mData: 'estado'},
        ]
    });

    */

    $('#tabla_pr_tabla').DataTable({
        processing: true,
        serverSide: true,
        ajax: 'consulta/cPr_Tabla.php',
        columns: [
            { "data": "id" },
            { "data": "nombre" },
            { "data": "pr_apellido" },
            { "data": "sg_apellido" },
            { "data": "estado" }
          ]
    });
});