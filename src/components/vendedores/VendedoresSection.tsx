import { useEffect, useState } from "react"

import { useToast } from "@/hooks/use-toast"

import CrearVendedorDialog from "./CrearVendedorDialog"
import { DataTable } from "./tableVendedores"
import { Vendedor } from "@/shared.types"
import { getAllVendedores } from "@/services/vendedorService"


function VendedoresSection() {
    const { toast } = useToast()

    const [listaVendedores, setListaVendedores] = useState<Vendedor[]>([])

    const triggerFetchVendedores = async () => {
        getAllVendedores().then((response) => {
            const vendedorsResponse: Vendedor[] = response.data.map((v) => {
                return {
                    "id": v.id,
                    "nombre": v.nombre,
                    "cuit": v.cuit,
                    "direccion": v.direccion,
                    "lat": v.coordenada.latitud,
                    "lng": v.coordenada.longitud,
                }
            })
            setListaVendedores(vendedorsResponse)
        }).catch (e => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Error cargando vendedores",
                description: "No se pudieron cargar los vendedores del sistema",
            })
        })
    }

    useEffect(() => {
        triggerFetchVendedores()
    }, [])

    const datosTabla = listaVendedores 

    return (
        <div className="mt-2">
            <h1 className="mt-5 text-2xl font-bold">TABLA VENDEDORES</h1>
            <DataTable data={datosTabla} triggerFetchData={triggerFetchVendedores}/>
            
            <CrearVendedorDialog triggerFetchData={triggerFetchVendedores}/>
        </div>
    )
}
  
export default VendedoresSection
  