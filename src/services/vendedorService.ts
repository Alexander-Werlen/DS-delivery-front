import api from "./api.ts"

import { Vendedor } from "../components/vendedores/tableVendedores.tsx"

export const getAllVendedores = () => {
    return api.get("/vendedor")
}

export const deleteVendedor = (id: number) => {
    return api.delete(`vendedor/${id}`);
}

export const crearVendedor = (data: Vendedor) => {
    return api.post("/vendedor", 
        {
            "nombre": data.nombre,
            "cuit": data.cuit,
            "direccion": data.direccion,
            "coordenada": {
                "latitud": data.lat,
                "longitud": data.lng
            }
        }
    );
}

export const editarVendedor = (data: Vendedor) => {
    return api.put(`vendedor/${data.id}`, 
        {
            "id": data.id,
            "nombre": data.nombre,
            "cuit": data.cuit,
            "direccion": data.direccion,
            "coordenada": {
                "latitud": data.lat,
                "longitud": data.lng
            }
        }
    );
}