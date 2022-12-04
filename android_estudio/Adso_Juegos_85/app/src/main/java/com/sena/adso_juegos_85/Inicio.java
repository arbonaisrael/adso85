package com.sena.adso_juegos_85;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.ComponentName;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.PhoneNumberUtils;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.sena.adso_juegos_85.general.GlobalVariables;

public class Inicio extends AppCompatActivity {

    public static final String user = "names";

    private Button mButton;

    private FirebaseAuth mAuth;
    private DatabaseReference mDatabase;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.inicio);

        mAuth = FirebaseAuth.getInstance();
        mDatabase = FirebaseDatabase.getInstance().getReference();
        mButton = (Button) findViewById(R.id.btniniciarsesion);

        getAsistente();
        getSuscripcion();


        if (mAuth.getCurrentUser() != null){
            mButton.setText("Cerrar Sesión");
        } else {
            mButton.setText("Inicio Sesión");
        }

    }

    public void getSuscripcion() {
        if (mAuth.getCurrentUser() != null){
            String id = mAuth.getCurrentUser().getUid();
            mDatabase.child("Usuarios").child(id).addValueEventListener(new ValueEventListener() {
                @Override
                public void onDataChange(@NonNull DataSnapshot sUsu) {
                    if (sUsu.exists()){
                        String tpUsu = sUsu.child("suscripcion").getValue().toString();
                        GlobalVariables.tpsuscriptor = tpUsu;
                    }
                }

                @Override
                public void onCancelled(@NonNull DatabaseError error) {
                    Toast.makeText(Inicio.this,"Error de la app..",Toast.LENGTH_LONG).show();
                }
            });
        }
    }

    public void getAsistente() {
        mDatabase.child("Asistente").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot sAsi) {
                if (sAsi.exists()){
                    String numAsistente = sAsi.child("numero").getValue().toString();
                    String vidm = sAsi.child("membresiaurl").getValue().toString();

                    GlobalVariables.numeroasistente = numAsistente;
                    GlobalVariables.vidmembresia = vidm;
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(Inicio.this,"Error de la app..",Toast.LENGTH_LONG).show();
            }
        });
    }

    public void btniniciowhas(View view) {
        Intent intencion = new Intent("android.intent.action.MAIN");
        intencion.setComponent(new ComponentName("com.whatsapp","com.whatsapp.Conversation"));
        intencion.putExtra("jid", PhoneNumberUtils.stripSeparators(GlobalVariables.numeroasistente) + "@s.whatsapp.net");
        startActivity(intencion);
    }

    public void btninicioiniciar(View view) {
        if (mAuth.getCurrentUser() != null){
            mButton.setText("Inicio Sesión");
            mAuth.signOut();
        } else {
            startActivity(new Intent(Inicio.this,Login.class));
        }
    }

    public void btniniciocursos(View view) {
        if (mAuth.getCurrentUser() != null){
            Toast.makeText(this,"iniciado sesión",Toast.LENGTH_LONG).show();
        } else {
            Toast.makeText(this,"No ha iniciado sesión",Toast.LENGTH_LONG).show();
        }
    }

    public void btniniciobuscarcurso(View view) {
        if (mAuth.getCurrentUser() != null){
            Toast.makeText(this,"iniciado sesión",Toast.LENGTH_LONG).show();
        } else {
            Toast.makeText(this,"No ha iniciado sesión",Toast.LENGTH_LONG).show();
        }
    }
}