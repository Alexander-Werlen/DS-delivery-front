import { useEffect, useState } from "react"

import { useToast } from "@/hooks/use-toast"

import CrearClienteDialog from "./CrearClienteDialog"
import { DataTable } from "./tableClientes"
import { Cliente } from "@/shared.types"

import { getAllClientes } from "@/services/clienteService"

function ClientesSection() {
    const { toast } = useToast()

    const [listaClientes, setListaClientes] = useState<Cliente[]>([])

    const triggerFetchClientes = async () => {
        
      getAllClientes().then((response) => {
        const clientesResponse: Cliente[] = response.data.map((c) => {
          return {
            "id": c.id,
            "nombre": c.nombre,
            "apellido": c.apellido,
            "cuit": c.cuit,
            "email": c.email,
            "direccion": c.direccion,
            "lat": c.coordenada.latitud,
            "lng": c.coordenada.longitud,
          }
        })
        setListaClientes(clientesResponse)
      }).catch(e => {
        console.log(e)
        toast({
            variant: "destructive",
            title: "Error cargando clientes",
            description: "No se pudieron cargar los clientes del sistema",
        })
      })
    }

    useEffect(() => {
        triggerFetchClientes()
    }, [])

    const datosTabla = listaClientes 

    return (
        <div className="mt-2">
            <h1 className="mt-5 text-2xl font-bold">TABLA CLIENTES</h1>
            <DataTable data={datosTabla} triggerFetchData={triggerFetchClientes}/>
            
            <CrearClienteDialog triggerFetchData={triggerFetchClientes}/>
        </div>
    )
}
  
export default ClientesSection
  