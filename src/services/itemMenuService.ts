import api from "./api.ts"

import {Bebida, Comida } from "../components/itemsmenu/tableItemsMenu.tsx"

export const getAllItemsMenu = () => {
    return api.get("/item-menu")
}

export const deleteItemMenu = (id: number) => {
    return api.delete(`/item-menu/${id}`);
}

export const crearBebida = (data: Bebida) => {
    return api.post("/item-menu/bebida", 
        {
            "id": data.id,
            "nombre": data.nombre,
            "descripcion": data.descripcion,
            "precio": data.precio,
            "categoria": "BEBIDA",
            "vendedor": {
                "id": data.vendedor,
            },
            "esAptoCeliaco": data.esAptoCeliaco,
            "esAptoVegano": data.esAptoVegano,
            "volumen": data.volumen,
            "graduacionAlcoholica": data.graduacionAlcoholica,
            "esAlcoholica": data.esAlcoholica,
            "esGaseosa": data.esGaseosa
        }
    );
}

export const editarBebida = (data: Bebida) => {
    return api.put(`item-menu/bebida/${data.id}`, 
        {
            "id": data.id,
            "nombre": data.nombre,
            "descripcion": data.descripcion,
            "precio": data.precio,
            "categoria": "BEBIDA",
            "vendedor": {
                "id": data.vendedor_id,
            },
            "esAptoCeliaco": data.esAptoCeliaco,
            "esAptoVegano": data.esAptoVegano,
            "volumen": data.volumen,
            "graduacionAlcoholica": data.graduacionAlcoholica,
            "esAlcoholica": data.esAlcoholica,
            "esGaseosa": data.esGaseosa
        }
    );
}

export const crearComida = (data: Comida) => {
    return api.post("/item-menu/comida", 
        {
            "id": data.id,
            "nombre": data.nombre,
            "descripcion": data.descripcion,
            "precio": data.precio,
            "categoria": "BEBIDA",
            "vendedor": {
                "id": data.vendedor_id,
            },
            "esAptoCeliaco": data.esAptoCeliaco,
            "esAptoVegano": data.esAptoVegano,
            "peso": data.peso
        }
    );
}

export const editarComida = (data: Comida) => {
    return api.put(`item-menu/comida/${data.id}`, 
        {
            "id": data.id,
            "nombre": data.nombre,
            "descripcion": data.descripcion,
            "precio": data.precio,
            "categoria": "BEBIDA",
            "vendedor": {
                "id": data.vendedor_id,
            },
            "esAptoCeliaco": data.esAptoCeliaco,
            "esAptoVegano": data.esAptoVegano,
            "peso": data.peso
        }
    );
}