package com.sena.adso85_lite.utilidades;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

import java.util.ArrayList;

public abstract class ListaAdapter extends BaseAdapter {

    private ArrayList<?> entradas;
    private int R_Layout_IdView;
    private Context contexto;

    public ListaAdapter(Context contexto,int R_Layout_IdView,ArrayList<?> entradas){
        super();
        this.contexto = contexto;
        this.entradas = entradas;
        this.R_Layout_IdView= R_Layout_IdView;
    }

    @Override
    public int getCount() {
        return entradas.size();
    }

    @Override
    public Object getItem(int position) {
        return entradas.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View view, ViewGroup viewGroup) {
        if (view == null){
            LayoutInflater vi =
                    (LayoutInflater) contexto.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            view= vi.inflate(R_Layout_IdView,null);

        }

        onEntrada(entradas.get(position),view);
        return view;
    }

    public abstract void onEntrada(Object entrada,View view);
}
