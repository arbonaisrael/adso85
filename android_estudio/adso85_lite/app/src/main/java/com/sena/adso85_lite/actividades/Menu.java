package com.sena.adso85_lite.actividades;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.sena.adso85_lite.R;

public class Menu extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.menu);
    }

    public void cargarUsuarios(View view) {
        Intent ir = new Intent(this,ListaUsuarios.class);
        startActivity(ir);
    }
}