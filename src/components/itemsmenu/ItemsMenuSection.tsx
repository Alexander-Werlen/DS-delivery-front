import { useEffect, useState } from "react"

import { useToast } from "@/hooks/use-toast"

import CrearComidaDialog from "./CrearComidaDialog"
import { DataTable, ItemMenu } from "./tableItemsMenu"
import CrearBebidaDialog from "./CrearBebidaDialog"

function ItemsMenuSection() {
    const { toast } = useToast()

    const [listaItemsMenu, setListaItemsMenu] = useState<ItemMenu[]>([])

    const triggerFetchItemsMenu = async () => {
        try{
            //simula GET todos los ItemMenus del back
            const itemsMenuResponse: ItemMenu[] = [
                {
                    id: 1,
                    nombre: "Hamburguesa",
                    descripcion: "",
                    precio: 12003,
                    categoria: "COMIDA",
                    vendedor: 3,
                    esAptoVegano: false,
                    esAptoCeliaco: false,
                    peso: 32,
                    volumen: null,
                    graduacionAlcoholica: null,
                    esAlcoholica: null,
                    esGaseosa: null
                },
                {
                    id: 2,
                    nombre: "Coca",
                    descripcion: "cocaaaa",
                    precio: 1000,
                    categoria: "BEBIDA",
                    vendedor: 3,
                    esAptoVegano: true,
                    esAptoCeliaco: true,
                    peso: null,
                    volumen: 1000,
                    graduacionAlcoholica: 0,
                    esAlcoholica: false,
                    esGaseosa: true
                },
                {
                    id: 3,
                    nombre: "Agua",
                    descripcion: "",
                    precio: 1200,
                    categoria: "BEBIDA",
                    vendedor: 4,
                    esAptoVegano: true,
                    esAptoCeliaco: true,
                    peso: null,
                    volumen: 1000,
                    graduacionAlcoholica: 0,
                    esAlcoholica: false,
                    esGaseosa: false
                },
                {
                    id: 4,
                    nombre: "Agua",
                    descripcion: "",
                    precio: 1200,
                    categoria: "BEBIDA",
                    vendedor: 5,
                    esAptoVegano: true,
                    esAptoCeliaco: true,
                    peso: null,
                    volumen: 1000,
                    graduacionAlcoholica: 0,
                    esAlcoholica: false,
                    esGaseosa: false
                },
                {
                    id: 5,
                    nombre: "Empanada",
                    descripcion: "",
                    precio: 1200,
                    categoria: "COMIDA",
                    vendedor: 5,
                    esAptoVegano: false,
                    esAptoCeliaco: false,
                    peso: 320,
                    volumen: null,
                    graduacionAlcoholica: null,
                    esAlcoholica: null,
                    esGaseosa: null
                },
            ]
            
            setListaItemsMenu(itemsMenuResponse)
        } catch (err) {
            console.log(err)
            toast({
                variant: "destructive",
                title: "Error cargando items menu",
                description: "No se pudieron cargar los items menu del sistema",
            })
        }
    }

    useEffect(() => {
        triggerFetchItemsMenu()
    }, [])

    const datosTabla = listaItemsMenu

    return (
        <div className="mt-2">
            <h1 className="mt-5 text-2xl font-bold">TABLA ITEMS MENU</h1>
            <DataTable data={datosTabla} triggerFetchData={triggerFetchItemsMenu}/>
            
            <CrearComidaDialog triggerFetchData={triggerFetchItemsMenu}/>
            <CrearBebidaDialog triggerFetchData={triggerFetchItemsMenu}/>
        </div>
    )
}
  
export default ItemsMenuSection
  