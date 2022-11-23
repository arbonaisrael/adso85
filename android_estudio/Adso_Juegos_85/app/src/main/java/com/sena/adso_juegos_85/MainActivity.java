package com.sena.adso_juegos_85;


import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ImageView imageView = findViewById(R.id.image);
        Animation animation = AnimationUtils.loadAnimation(this,R.anim.alpha);

        animation.setFillAfter(true);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent ir = new Intent(MainActivity.this, Inicio.class);
                startActivity(ir);
                finish();
            }
        },2000);

    }


}