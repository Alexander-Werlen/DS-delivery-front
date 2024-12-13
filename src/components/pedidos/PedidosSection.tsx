import { useEffect, useState } from "react"

import { useToast } from "@/hooks/use-toast"

import CrearPedidoDialog from "./CrearPedidoDialog"
import { DataTable } from "./tablePedidos"
import { Pedido } from "@/shared.types"

import { getAllPedidos } from "@/services/pedidoService"

function PedidosSection() {
    const { toast } = useToast()

    const [listaPedidos, setListaPedidos] = useState<Pedido[]>([])

    const triggerFetchPedidos = async () => {
        
      getAllPedidos().then((response) => {
        const pedidosResponse: Pedido[] = response.data.map((c) => {
          return {
            "id": c.id,
            "pago": c.pago?.metodo,
            "vendedor_id": c.vendedor.id,
            "cliente_id": c.cliente.id,
            "precio_total": c.precioAcumulado,
            "estado": c.estado,
          }
        })
        setListaPedidos(pedidosResponse)
      }).catch(e => {
        console.log(e)
        toast({
            variant: "destructive",
            title: "Error cargando pedidos",
            description: "No se pudieron cargar los pedidos del sistema",
        })
      })
    }

    useEffect(() => {
        triggerFetchPedidos()
    }, [])

    const datosTabla = listaPedidos 

    return (
        <div className="mt-2">
            <h1 className="mt-5 text-2xl font-bold">TABLA PEDIDOS</h1>
            <DataTable data={datosTabla} triggerFetchData={triggerFetchPedidos}/>
            
            <CrearPedidoDialog triggerFetchData={triggerFetchPedidos}/>
        </div>
    )
}
  
export default PedidosSection
  