import { useEffect, useState } from "react"

import { useToast } from "@/hooks/use-toast"

import CrearClienteDialog from "./CrearClienteDialog"
import { DataTable, Cliente } from "./tableClientes"

function ClientesSection() {
    const { toast } = useToast()

    const [listaClientes, setListaClientes] = useState<Cliente[]>([])

    const triggerFetchClientes = async () => {
        try{
            //simula GET todos los clientes del back
            const clientesResponse: Cliente[] = [
                {
                  id: 5,
                  nombre: 'Pedro',
                  apellido: 'Perez',
                  cuit: '30-12345678-9',
                  email: 'fH7nG@example.com',
                  direccion: 'Calle 123',
                  lat: -94.2321,
                  lng: 28.085685
                },
                {
                    id: 2,
                    nombre: 'Juan',
                    apellido: 'Perez',
                    cuit: '10-12343678-9',
                    email: 'f123dfsnG@example.com',
                    direccion: 'Calle 49801',
                    lat: -194.2321,
                    lng: 228.085685
                },
                {
                    id: 3,
                    nombre: 'Ale',
                    apellido: 'Eerez',
                    cuit: '20-12345678-9',
                    email: 'fH7nG@example.com',
                    direccion: 'Calle 123',
                    lat: -54.2321,
                    lng: 428.085685
                },
                {
                  id: 1,
                  nombre: 'Pedro',
                  apellido: 'Perez',
                  cuit: '30-12345678-9',
                  email: 'fH7nG@example.com',
                  direccion: 'Calle 123',
                  lat: -94.2321,
                  lng: 28.085685
                },
                {
                  id: 2,
                  nombre: 'Juan',
                  apellido: 'Perez',
                  cuit: '10-12343678-9',
                  email: 'f123dfsnG@example.com',
                  direccion: 'Calle 49801',
                  lat: -194.2321,
                  lng: 228.085685
                },
                {
                  id: 3,
                  nombre: 'Ale',
                  apellido: 'Eerez',
                  cuit: '20-12345678-9',
                  email: 'fH7nG@example.com',
                  direccion: 'Calle 123',
                  lat: -54.2321,
                  lng: 428.085685
                }
            ]
            
            setListaClientes(clientesResponse)
        } catch (err) {
            console.log(err)
            toast({
                variant: "destructive",
                title: "Error cargando clientes",
                description: "No se pudieron cargar los clientes del sistema",
            })
        }
    }

    useEffect(() => {
        triggerFetchClientes()
    }, [])

    return (
        <div className="mt-2">
            <h1 className="mt-5 text-2xl font-bold">TABLA CLIENTES</h1>
            <DataTable data={listaClientes}/>
            
            <CrearClienteDialog />
        </div>
    )
}
  
export default ClientesSection
  