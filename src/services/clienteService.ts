import api from "./api.ts"

import { Cliente } from "../components/clientes/tableClientes"

export const getAllClientes = () => {
    return api.get("/cliente")
}

export const deleteCliente = (id: number) => {
    return api.delete(`cliente/${id}`);
}

export const crearCliente = (data: Cliente) => {
    return api.post("/cliente", 
        {
            "nombre": data.nombre,
            "apellido": data.apellido,
            "cuit": data.cuit,
            "email": data.email,
            "direccion": data.direccion,
            "coordenada": {
                "latitud": data.lat,
                "longitud": data.lng
            }
        }
    );
}

export const editarCliente = (data: Cliente) => {
    return api.put(`cliente/${data.id}`, 
        {
            "id": data.id,
            "nombre": data.nombre,
            "apellido": data.apellido,
            "cuit": data.cuit,
            "email": data.email,
            "direccion": data.direccion,
            "coordenada": {
                "latitud": data.lat,
                "longitud": data.lng
            }
        }
    );
}