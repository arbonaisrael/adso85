package com.sena.adso_juegos_85;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthUserCollisionException;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.HashMap;
import java.util.Map;

public class Registro extends AppCompatActivity {

    private EditText mreg_nomcompleto;
    private EditText mreg_telefono;
    private EditText mreg_correo;
    private EditText mreg_ciudad;
    private EditText mreg_clave;
    private EditText mreg_clave_con;


    private String nomcompleto,telefono,correo,ciudad,clave, clave_con;

    private ProgressDialog progressDialog;

    private FirebaseAuth mAuth;
    private DatabaseReference mDatabase;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.registro);

        mAuth = FirebaseAuth.getInstance();
        mDatabase = FirebaseDatabase.getInstance().getReference();
        progressDialog = new ProgressDialog(this);


        mreg_nomcompleto = (EditText) findViewById(R.id.reg_nomcompleto);
        mreg_telefono = (EditText) findViewById(R.id.reg_telefono);
        mreg_correo = (EditText) findViewById(R.id.reg_correo);
        mreg_ciudad = (EditText) findViewById(R.id.reg_ciudad);

        mreg_clave = (EditText) findViewById(R.id.reg_clave);
        mreg_clave_con = (EditText) findViewById(R.id.reg_clave_con);
    }

    public void btn_registro_atras(View view) {
        finish();
    }

    public void btn_registro_inicio(View view) {
        startActivity(new Intent(Registro.this,Inicio.class));
    }

    public void btn_registro_asistente(View view) {
    }

    public void btnRegistrocrear(View view) {
        nomcompleto = mreg_nomcompleto.getText().toString();
        telefono = mreg_telefono.getText().toString();
        correo = mreg_correo.getText().toString();
        ciudad = mreg_ciudad.getText().toString();

        clave =  mreg_clave.getText().toString();
        clave_con =  mreg_clave_con.getText().toString();

        if (!nomcompleto.isEmpty() && !telefono.isEmpty()
                && !correo.isEmpty() && !ciudad.isEmpty()
                && !clave.isEmpty() && !clave_con.isEmpty()) {

            if (clave.length() >= 6) {
                if (clave.equals(clave_con)) {
                    registrarusuario();
                }else {
                    Toast.makeText(Registro.this, "La contraseñas no coinciden", Toast.LENGTH_LONG).show();
                }
            } else {
                Toast.makeText(Registro.this, "La contraseña debe tener almenos 6 caracteres", Toast.LENGTH_LONG).show();
            }
        } else {
            Toast.makeText(Registro.this, "Debe completar los campos", Toast.LENGTH_LONG).show();
        }

    }

    private void registrarusuario() {

        progressDialog.setMessage("Realizando registro en línea...");
        progressDialog.show();

        mAuth.createUserWithEmailAndPassword(correo,clave).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete(@NonNull Task<AuthResult> task) {
                if (task.isSuccessful()) {

                    Map<String,Object> map = new HashMap<>();
                    map.put("nomcompleto",nomcompleto);
                    map.put("telefono",telefono);
                    map.put("correo",correo);
                    map.put("ciudad",ciudad);
                    map.put("clave",clave);
                    map.put("suscripcion","inactivo");

                    String id = mAuth.getCurrentUser().getUid();

                    mDatabase.child("Usuarios").child(id).setValue(map).addOnCompleteListener(new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(@NonNull Task<Void> taskBase) {
                            if (taskBase.isSuccessful()){
                                Intent ir = new Intent(Registro.this,Inicio.class);
                                startActivity(ir);
                                finish();
                            } else {
                                Toast.makeText(Registro.this,"No se pudieron crear los datos correctamente", Toast.LENGTH_LONG).show();
                            }
                        }
                    });

                } else {
                    if (task.getException() instanceof FirebaseAuthUserCollisionException) {
                        Toast.makeText(Registro.this, "Usuario ya existe ", Toast.LENGTH_SHORT).show();
                    } else {
                        Toast.makeText(Registro.this, "No se pudo registrar el usuario ", Toast.LENGTH_LONG).show();
                    }
                }
                progressDialog.dismiss();
            }
        });

    }
}