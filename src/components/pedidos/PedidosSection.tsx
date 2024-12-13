import { useEffect, useState } from "react"

import { useToast } from "@/hooks/use-toast"

import CrearPedidoDialog from "./CrearPedidoDialog"
import { DataTable } from "./tablePedidos"
import { Cliente, Pedido, Vendedor } from "@/shared.types"

import { getAllPedidos } from "@/services/pedidoService"
function PedidosSection() {
  const { toast } = useToast()

  const [listaPedidos, setListaPedidos] = useState<Pedido[]>([])
  const [vendedores, setVendedores] = useState<Vendedor[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const triggerFetchPedidos = async () => {

    getAllPedidos().then((response) => {
      const pedidosResponse: Pedido[] = response.data.map((c) => {
        return {
          "id": c.id,
          "pago": c.pago?.metodo,
          "vendedor": c.vendedor.nombre,
          "vendedor_id": c.vendedor.id,
          "cliente": c.cliente.nombre,
          "cliente_id": c.cliente.id,
          "precio_total": c.precioAcumulado,
          "estado": c.estado,
        }
      });
      const seenIds = new Set();
      const vendedoresResponse: Vendedor[] = response.data.map(p => {
        if (seenIds.has(p.vendedor.id)) {
          return null;
        }
        seenIds.add(p.vendedor.id);
        return {
          "id": p.vendedor.id,
          "nombre": p.vendedor.nombre,
          "cuit": p.vendedor.cuit,
          "direccion": p.vendedor.direccion,
          "lat": p.vendedor.coordenada.latitud,
          "lng": p.vendedor.coordenada.longitud,
        }
      }
      ).filter((v) => v !== null);
      seenIds.clear();
      const clientesResponse: Cliente[] = response.data.map(p => {
        if (seenIds.has(p.cliente.id)) {
          return null;
        }
        seenIds.add(p.cliente.id);
        return {
          "id": p.cliente.id,
          "nombre": p.cliente.nombre,
          "apellido": p.cliente.apellido,
          "cuit": p.cliente.cuit,
          "email": p.cliente.email,
          "direccion": p.cliente.direccion,
          "lat": p.cliente.coordenada.latitud,
          "lng": p.cliente.coordenada.longitud,
        }
      }).filter((c) => c !== null);
      setListaPedidos(pedidosResponse);
      setVendedores(vendedoresResponse);
      setClientes(clientesResponse);

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

  // Parse data from listapedidos to get all clients and vendors


  return (
    <div className="mt-2">
      <h1 className="mt-5 text-2xl font-bold">TABLA PEDIDOS</h1>
      <DataTable data={listaPedidos} clientes={clientes} vendedores={vendedores} triggerFetchData={triggerFetchPedidos} />

      <CrearPedidoDialog triggerFetchData={triggerFetchPedidos} />
    </div>
  )
}

export default PedidosSection
