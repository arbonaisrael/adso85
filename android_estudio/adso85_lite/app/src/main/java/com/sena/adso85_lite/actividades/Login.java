package com.sena.adso85_lite.actividades;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.sena.adso85_lite.utilidades.Dbsqlite;
import com.sena.adso85_lite.R;
import com.sena.adso85_lite.controladores.CtrlUsuario;

import java.util.List;

public class Login extends AppCompatActivity {

    private EditText eUsuario, eContrasena;

    private Intent ir;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);

        eUsuario = (EditText) findViewById(R.id.eLogin);
        eContrasena = (EditText) findViewById(R.id.eContra);
    }


    public void validarUsuario(){
        eUsuario.setError(null);
        eContrasena.setError(null);

        String vUsu = eUsuario.getText().toString();
        String vCon = eContrasena.getText().toString();

        boolean cancelar = false;
        View focusView = null;

        if (TextUtils.isEmpty(vUsu)){
            eUsuario.setError("El usuario no es valido!");
            focusView = eUsuario;
            cancelar = true;
        }

        if (TextUtils.isEmpty(vCon)){
            eContrasena.setError("La contraseña no es valida!");
            focusView = eContrasena;
            cancelar = true;
        }

        if (cancelar){
            focusView.requestFocus();
        } else {
            List<CtrlUsuario> listUsuarioVal;

            Dbsqlite base = new Dbsqlite(this,null,null,1);

            listUsuarioVal = base.loginUsuario(vUsu,vCon);

            if (!listUsuarioVal.isEmpty()){
                Toast.makeText(this,"Inicio de sesión correcto!",Toast.LENGTH_SHORT).show();
                ir = new Intent(this, Menu.class);
                startActivity(ir);
            } else {
                Toast.makeText(this,"Inicio de sesión incorrecto!",Toast.LENGTH_SHORT).show();
            }
        }
    }

    public void btnInicioSesion(View view) {

        validarUsuario();

    }


    public void btnRegistroUsuario(View view) {
        ir = new Intent(this, RegistroUsuario.class);
        startActivity(ir);
    }
}