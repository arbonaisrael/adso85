package com.sena.adso85_lite.actividades;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import com.sena.adso85_lite.R;
import com.sena.adso85_lite.controladores.CtrlUsuario;
import com.sena.adso85_lite.utilidades.Dbsqlite;
import com.sena.adso85_lite.utilidades.ListaAdapter;

import java.util.ArrayList;
import java.util.List;

public class ListaUsuarios extends AppCompatActivity {

    private ListView listar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.lista_usuarios);

        cargarLista();
    }

    public void cargarLista(){
        Dbsqlite db = new Dbsqlite(this,null,null,1);

        ArrayList<CtrlUsuario> datos = new ArrayList<CtrlUsuario>();

        datos = db.listarUsuario();

        if (!datos.isEmpty()){

            listar = (ListView) findViewById(R.id.lista_usuarios);

            listar.setAdapter(new ListaAdapter(this,R.layout.lst_usuarios,datos) {
                @Override
                public void onEntrada(Object entrada, View view) {
                    if(entrada != null){

                        TextView login = (TextView) view.findViewById(R.id.lstUlogin);
                        if(login != null){
                            login.setText(((CtrlUsuario)entrada).getLogin());
                        }

                        TextView rol = (TextView) view.findViewById(R.id.lstUrol);
                        if(rol != null){
                            if( ((CtrlUsuario)entrada).getRol() == 1 ){
                                rol.setText("Administrador");
                            } else {
                                rol.setText("Usuario");
                            }
                        }

                        TextView estado = (TextView) view.findViewById(R.id.lstUestado);
                        if(estado != null){
                            if( ((CtrlUsuario)entrada).getEstado() == 1 ){
                                estado.setText("Activo");
                            } else {
                                estado.setText("Inactivo");
                            }
                        }

                        ImageView ima = (ImageView) view.findViewById(R.id.lstUimagen);
                        if(ima != null){
                            if( ((CtrlUsuario)entrada).getRol() == 1 ){
                                int idm = getResources().getIdentifier("administrador",
                                        "drawable",
                                        getPackageName());
                                ima.setBackgroundResource(idm);
                            } else {
                                int idm = getResources().getIdentifier("usuario",
                                        "drawable",
                                        getPackageName());
                                ima.setBackgroundResource(idm);
                            }
                        }

                        /*

                        ImageView elim = (ImageView) view.findViewById(R.id.lst_ueliminar);
                        if (elim != null){
                            elim.setContentDescription(String.valueOf
                                    (((CtrlUsuario)entrada).getId()));
                        }

                        */


                    }
                }
            });

        }



    }

    public void btnCrearUsuario(View view) {
        Intent ir = new Intent(this,RegistroUsuario.class);
        startActivity(ir);
    }
}