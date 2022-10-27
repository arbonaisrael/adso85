package com.sena.adso85_lite.controladores;

public class CtrlUsuario {

    private String login;
    private String contrasena;
    private String fec_creacion;
    private int id;
    private int estado;
    private int rol;

    public CtrlUsuario() {

    }

    public CtrlUsuario(int id,String login, String contrasena, String fec_creacion,
                       int estado, int rol){

        this.id = id;
        this.login = login;
        this.contrasena = contrasena;
        this.fec_creacion = fec_creacion;
        this.estado = estado;
        this.rol = rol;

    }

    public CtrlUsuario(String login, String contrasena, String fec_creacion,
                       int estado, int rol){

        this.login = login;
        this.contrasena = contrasena;
        this.fec_creacion = fec_creacion;
        this.estado = estado;
        this.rol = rol;

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getFec_creacion() {
        return fec_creacion;
    }

    public void setFec_creacion(String fec_creacion) {
        this.fec_creacion = fec_creacion;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public int getRol() {
        return rol;
    }

    public void setRol(int rol) {
        this.rol = rol;
    }

}
