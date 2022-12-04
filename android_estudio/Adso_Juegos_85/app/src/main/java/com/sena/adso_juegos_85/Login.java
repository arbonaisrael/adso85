package com.sena.adso_juegos_85;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.ComponentName;
import android.content.Intent;
import android.os.Bundle;
import android.os.IBinder;
import android.telephony.PhoneNumberUtils;
import android.text.TextUtils;
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
import com.sena.adso_juegos_85.general.GlobalVariables;

public class Login extends AppCompatActivity {

    private EditText mLogCorreo;
    private EditText mLogClave;

    private ProgressDialog progressDialog;

    private FirebaseAuth mAuth;
    private DatabaseReference mDatabase;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);

        mAuth = FirebaseAuth.getInstance();
        mDatabase = FirebaseDatabase.getInstance().getReference();

        progressDialog = new ProgressDialog(this);

        mLogCorreo = (EditText) findViewById(R.id.log_correo);
        mLogClave = (EditText) findViewById(R.id.log_clave);
    }

    public void btn_login_atras(View view) {
        finish();
    }

    public void btn_login_inicio(View view) {
        finish();
    }

    public void btn_login_asistente(View view) {
        Intent intencion = new Intent("android.intent.action.MAIN");
        intencion.setComponent(new ComponentName("com.whatsapp","com.whatsapp.Conversation"));
        intencion.putExtra("jid", PhoneNumberUtils.stripSeparators(GlobalVariables.numeroasistente) + "@s.whatsapp.net");
        startActivity(intencion);

    }

    public void btnloginrestaurar(View view) {

        String correo = mLogCorreo.getText().toString();
        if (TextUtils.isEmpty(correo)){
            Toast.makeText(this, "Se debe ingresar un correo", Toast.LENGTH_SHORT).show();
            return;
        }

        mAuth.setLanguageCode("es");
        mAuth.sendPasswordResetEmail(correo).addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> taskRes) {
                if (taskRes.isSuccessful()){
                    Toast.makeText(Login.this, "Se ha enviado la información para reestablecer tu contraseña", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(Login.this, "No se pudo enviar la información para reestablecer la contraseña", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    public void btnLoginingresar(View view) {

        final String correo = mLogCorreo.getText().toString().trim();
        String clave = mLogClave.getText().toString().trim();

        if (TextUtils.isEmpty(correo)){
            Toast.makeText(this, "Se debe ingresar un correo", Toast.LENGTH_SHORT).show();
            return;
        }

        if (TextUtils.isEmpty(clave)){
            Toast.makeText(this, "Falta ingresar la contraseña", Toast.LENGTH_SHORT).show();
        }

        progressDialog.setMessage("Realizando consulta en línea....");
        progressDialog.show();

        mAuth.signInWithEmailAndPassword(correo,clave)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()){
                            String id = mAuth.getCurrentUser().getUid();
                            int pos = correo.indexOf("@");
                            String user = correo.substring(0,pos);
                            Toast.makeText(Login.this, "Bienvenido: " + mLogCorreo.getText(), Toast.LENGTH_SHORT).show();
                            Intent ir = new Intent(getApplication(),Inicio.class);
                            ir.putExtra(Inicio.user,user);
                            startActivity(ir);
                        } else {
                            if (task.getException() instanceof FirebaseAuthUserCollisionException){
                                Toast.makeText(Login.this, "Ese usuario ya existe", Toast.LENGTH_SHORT).show();
                            } else {
                                Toast.makeText(Login.this, "No se pudo iniciar sesión", Toast.LENGTH_SHORT).show();
                            }
                        }

                        progressDialog.dismiss();
                    }
                });
    }

    public void btnLogincrear(View view) {
        Intent ir = new Intent(Login.this,Registro.class);
        startActivity(ir);
    }
}