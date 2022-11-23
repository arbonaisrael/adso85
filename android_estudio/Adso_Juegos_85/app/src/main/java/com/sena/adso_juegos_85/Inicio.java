package com.sena.adso_juegos_85;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class Inicio extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.inicio);
    }

    public void btniniciowhas(View view) {
    }

    public void btninicioiniciar(View view) {
        startActivity(new Intent(Inicio.this,Registro.class));
    }

    public void btniniciocursos(View view) {
    }

    public void btniniciobuscarcurso(View view) {
    }
}