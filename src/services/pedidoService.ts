import api from "./api.ts"

import { Pedido, PedidoResponse } from "@/shared.types.ts"

export const getAllPedidos = () => {
    return api.get<PedidoResponse[]>("/pedido")
}

export const getPedidoById = (id: number) => {
    return api.get<PedidoResponse>(`pedido/${id}`);
}

export const editItemsOfPedido = (
    id: number, 
    items: {
        item_menu_id: number;
        cantidad: number;
    }[]
    ) => {
    return api.put(`pedido/${id}/items`, items.map((i) => {return {
        "itemMenuId": i.item_menu_id,
        "cantidad": i.cantidad
    }}));
}
export const addItemsToPedido = (
    id: number, 
    items: {
        item_menu_id: number;
        cantidad: number;
    }[]
    ) => {
    return api.post(`pedido/${id}/items`, items.map((i) => {return {
        "itemMenuId": i.item_menu_id,
        "cantidad": i.cantidad
    }}));
}

export const deletePedido = (id: number) => {
    return api.delete(`pedido/${id}`);
}

export const crearPedido = (data: Pedido) => {
    return api.post("/pedido", 
        {
            "vendedorId": data.vendedor_id,
            "clienteId": data.cliente_id,
        }
    );
}

export const editarPedido = (data: Pedido) => {
    return api.put(`pedido/${data.id}`, 
        {
            "vendedorId": data.vendedor_id,
            "clienteId": data.cliente_id,
            "estado": data.estado,
        }
    );
}