package com.sena.adso85_lite.actividades;

import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.os.Bundle;
import android.text.InputType;
import android.text.TextUtils;
import android.view.View;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.sena.adso85_lite.utilidades.Dbsqlite;
import com.sena.adso85_lite.R;
import com.sena.adso85_lite.controladores.CtrlUsuario;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class RegistroUsuario extends AppCompatActivity {

    private EditText eUsu,eCon,eConV,eFec;
    private Spinner sEst,sRol;

    private DatePickerDialog mFecSave;
    private SimpleDateFormat dateFormat;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.registro_usuario);

        iniVariables();

    }

    public void iniVariables(){
        eUsu = (EditText) findViewById(R.id.reusuario);
        eCon = (EditText) findViewById(R.id.recontrasena);
        eConV = (EditText) findViewById(R.id.recontrasenav);

        eFec = (EditText) findViewById(R.id.refeccreacion);
        eFec.setInputType(InputType.TYPE_NULL);

        sEst = (Spinner) findViewById(R.id.rsestado);
        sRol = (Spinner) findViewById(R.id.rsrol);

        dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        eFec.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Calendar miCalendar = Calendar.getInstance();

                mFecSave = new DatePickerDialog(RegistroUsuario.this,
                        new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker view, int anho, int mes, int dia) {
                        Calendar mifecha = Calendar.getInstance();
                        mifecha.set(anho,mes,dia);
                        eFec.setText(dateFormat.format(mifecha.getTime()));

                    }
                },miCalendar.get(Calendar.YEAR),
                        miCalendar.get(Calendar.MONTH),
                        miCalendar.get(Calendar.DAY_OF_MONTH));
                mFecSave.show();
            }
        });

    }


    public void validarUsuario(){
        eUsu.setError(null);
        eCon.setError(null);
        eConV.setError(null);

        String vUsu = eUsu.getText().toString();
        String vCon = eCon.getText().toString();
        String vConV = eConV.getText().toString();

        boolean cancelar = false;
        View focusView = null;

        if (TextUtils.isEmpty(vUsu)){
            eUsu.setError("El usuario no es valido!");
            focusView = eUsu;
            cancelar = true;
        }

        if (TextUtils.isEmpty(vCon)){
            eCon.setError("La contraseña no es valida!");
            focusView = eCon;
            cancelar = true;
        }

        if (TextUtils.isEmpty(vConV)){
            eConV.setError("La contraseña Verificación no es valida!");
            focusView = eConV;
            cancelar = true;
        }

        if (!vCon.equals(vConV)){
            eConV.setError("La contraseña no es igual");
            focusView = eConV;
            cancelar = true;
        }



        if (cancelar){
            focusView.requestFocus();
        } else {
            Dbsqlite db = new Dbsqlite(this,null,null,1);

            CtrlUsuario ctrlUsuario = new CtrlUsuario(
                    vUsu,
                    vCon,
                    eFec.getText().toString(),
                    sEst.getSelectedItemPosition(),
                    sRol.getSelectedItemPosition()
            );

            db.insertUsuario(ctrlUsuario);

            Toast.makeText(this, "Usuario Registrado Exitosamente!", Toast.LENGTH_SHORT).show();
        }
    }

    public void rbguardarusu(View view) {
        validarUsuario();
    }
}