import { useEffect, useState } from "react"

import { useToast } from "@/hooks/use-toast"

import CrearComidaDialog from "./CrearComidaDialog"
import { DataTable } from "./tableItemsMenu"
import { ItemMenu } from "@/shared.types"
import CrearBebidaDialog from "./CrearBebidaDialog"

import { getAllItemsMenu } from "@/services/itemMenuService.ts"

function ItemsMenuSection() {
    const { toast } = useToast()

    const [listaItemsMenu, setListaItemsMenu] = useState<ItemMenu[]>([])

    const triggerFetchItemsMenu = async () => {
        getAllItemsMenu().then((response) => {
            const itemsResponse: ItemMenu[] = []
            response.data.bebidas.forEach((data) => {
                itemsResponse.push({
                "id": data.id,
                "nombre": data.nombre,
                "descripcion": data.descripcion,
                "precio": data.precio,
                "categoria": "BEBIDA",
                "vendedor_id": data.vendedor?.id,
                "vendedor": data.vendedor?.nombre,
                "esAptoCeliaco": data.esAptoCeliaco,
                "esAptoVegano": data.esAptoVegano,
                "peso": data.peso,
                "volumen": data.volumen,
                "graduacionAlcoholica": data.graduacionAlcoholica,
                "esAlcoholica": data.esAlcoholica,
                "esGaseosa": data.esGaseosa
                })
            })
            response.data.comidas.forEach((data) => {
                itemsResponse.push({
                "id": data.id,
                "nombre": data.nombre,
                "descripcion": data.descripcion,
                "precio": data.precio,
                "categoria": "COMIDA",
                "vendedor_id": data.vendedor?.id,
                "vendedor": data.vendedor?.nombre,
                "esAptoCeliaco": data.esAptoCeliaco,
                "esAptoVegano": data.esAptoVegano,
                "peso": data.peso,
                "volumen": null,
                "graduacionAlcoholica": null,
                "esAlcoholica": null,
                "esGaseosa": null
                })
            })
            setListaItemsMenu(itemsResponse)
          }).catch(e => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Error cargando items menu",
                description: "No se pudieron cargar los items menu del sistema",
            })
          })
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
  