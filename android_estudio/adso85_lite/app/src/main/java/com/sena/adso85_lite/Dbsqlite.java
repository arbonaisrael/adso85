package com.sena.adso85_lite;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.hardware.lights.LightState;

import com.sena.adso85_lite.controladores.CtrlUsuario;

import java.util.ArrayList;
import java.util.List;

public class Dbsqlite extends SQLiteOpenHelper {

    private static String dbName = "adso85.db";
    private static int dbVersion = 1;


    public Dbsqlite(Context context, String name, SQLiteDatabase.CursorFactory factory, int version) {
        super(context, dbName, factory, dbVersion);
    }


    @Override
    public void onCreate(SQLiteDatabase db) {
        String dllUsuario = "CREATE TABLE usuarios(";
        dllUsuario       += "id INTEGER PRIMARY KEY AUTOINCREMENT,";
        dllUsuario       += "login TEXT,";
        dllUsuario       += "contrasena TEXT,";
        dllUsuario       += "fec_creacion TEXT,";
        dllUsuario       += "estado INTEGER,";
        dllUsuario       += "rol INTEGER);";

        String insertUsuario = "INSERT INTO usuarios (login,contrasena,fec_creacion,estado,rol)";
        insertUsuario       += "SELECT 'admin','admin','2021-09-09',1,1 UNION ALL ";
        insertUsuario       += "SELECT 'usuario','usuario','2021-09-09',1,2;";

        db.execSQL(dllUsuario);
        db.execSQL(insertUsuario);

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

        String dllUsuario = "DROP TABLE IF EXISTS usuarios;";
        db.execSQL(dllUsuario);
        onCreate(db);

    }


    public List<CtrlUsuario> loginUsuario(String usu, String con){
        List<CtrlUsuario> usuarioList = new ArrayList<CtrlUsuario>();
        SQLiteDatabase base = this.getWritableDatabase();

        String consulta = "SELECT id,login,contrasena,fec_creacion,estado,rol ";
        consulta        += "FROM usuarios WHERE login = '";
        consulta        += usu;
        consulta        += "' AND contrasena = '";
        consulta        += con;
        consulta        += "';";

        Cursor cursor = base.rawQuery(consulta,null);

        if (cursor.moveToFirst()){
            CtrlUsuario ctrlUsuario = new CtrlUsuario();

            ctrlUsuario.setLogin(cursor.getString(1));
            ctrlUsuario.setContrasena(cursor.getString(2));
            ctrlUsuario.setFec_creacion(cursor.getString(3));
            ctrlUsuario.setEstado(cursor.getInt(4));
            ctrlUsuario.setRol(cursor.getInt(5));

            usuarioList.add(ctrlUsuario);
        }

        cursor.close();
        base.close();

        return usuarioList;

    }
}
