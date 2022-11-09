package com.sena.adso85_lite;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.sena.adso85_lite.actividades.Login;

public class MainActivity extends AppCompatActivity {

    private int contar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        contar = 0;
    }

    public void btnMostrar(View view) {
        contar += 1;
        Toast.makeText(this, "ADSO" + contar, Toast.LENGTH_SHORT).show();
    }

    public void mainIngresar(View view) {
        Intent ir = new Intent(this, Login.class);
        startActivity(ir);
    }
}