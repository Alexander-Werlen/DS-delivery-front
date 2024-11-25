import { useEffect, useState } from "react"

import { useToast } from "@/hooks/use-toast"

import CrearVendedorDialog from "./CrearVendedorDialog"
import { DataTable, Vendedor } from "./tableVendedores"

function VendedoresSection() {
    const { toast } = useToast()

    const [listaVendedores, setListaVendedores] = useState<Vendedor[]>([])

    const triggerFetchVendedores = async () => {
        try{
            //simula GET todos los vendedors del back
            const vendedorsResponse: Vendedor[] = [
                {
                  id: 5,
                  nombre: 'Pedro',
                  cuit: '30-12345678-9',
                  email: 'fH7nG@example.com',
                  direccion: 'Calle 123',
                  lat: -94.2321,
                  lng: 28.085685
                },
                {
                    id: 2,
                    nombre: 'Juan',
                    cuit: '10-12343678-9',
                    email: 'f123dfsnG@example.com',
                    direccion: 'Calle 49801',
                    lat: -194.2321,
                    lng: 228.085685
                },
                {
                    id: 3,
                    nombre: 'Ale',
                    cuit: '20-12345678-9',
                    email: 'fH7nG@example.com',
                    direccion: 'Calle 123',
                    lat: -54.2321,
                    lng: 428.085685
                },
                {
                  id: 1,
                  nombre: 'Pedro',
                  cuit: '30-12345678-9',
                  email: 'fH7nG@example.com',
                  direccion: 'Calle 123',
                  lat: -94.2321,
                  lng: 28.085685
                },
                
            ]
            
            setListaVendedores(vendedorsResponse)
        } catch (err) {
            console.log(err)
            toast({
                variant: "destructive",
                title: "Error cargando vendedors",
                description: "No se pudieron cargar los vendedors del sistema",
            })
        }
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
  