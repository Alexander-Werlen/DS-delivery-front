"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { AgregarItemsToPedidoDialog } from "./AgregarItemsToPedidoDialog"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"


import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../generales/dialog"

import { useEffect, useState } from "react"

import { ItemMenu, Pedido } from "@/shared.types"

import { useToast } from "@/hooks/use-toast"

import { getPedidoById, editItemsOfPedido } from "@/services/pedidoService"
import { getAllItemsMenuFromVendedor } from "@/services/itemMenuService"

import { ItemPedidoFormSchema, ItemPedidoForm } from "./schemas"
import { Button } from "../ui/button"
import { X } from "lucide-react"

interface EditarItemsOfPedidoDialogProps {
    open: boolean,
    pedidoData: Pedido,
    isEditable: boolean,
    closeEditarItemsOfPedidoDialog: () => void,
    triggerFetchData: () => void
}
const formSchema = ItemPedidoFormSchema

export default function EditarItemsOfPedidoDialog({ open, pedidoData, isEditable, closeEditarItemsOfPedidoDialog, triggerFetchData }: EditarItemsOfPedidoDialogProps) {
    const [showAgregarItems, setShowAgregarItems] = useState(false)
    const [availableItems, setAvailableItems] = useState<ItemMenu[]>([])
    const { toast } = useToast()

    // Fetch available items when dialog opens
    const fetchAvailableItems = async () => {
        getAllItemsMenuFromVendedor(pedidoData.vendedor_id).then((response) => {
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
            setAvailableItems(itemsResponse)
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
        if (showAgregarItems) {
            fetchAvailableItems()
        }

    }, [showAgregarItems])

    // 1. Define your form.
    const form = useForm<ItemPedidoForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            items: []
        }
    })
    const { fields, replace, update } = useFieldArray({ name: "items", control: form.control });
    // Modified handleAddItems to properly update form
    const handleAddItems = (selectedItems: Array<{ item_menu_id: number, cantidad: number }>) => {
        const itemsToAdd = selectedItems.map(item => {
            const menuItem = availableItems.find(i => i.id === item.item_menu_id)
            return {
                item_menu_id: item.item_menu_id,
                item_menu_nombre: menuItem?.nombre || "",
                cantidad: item.cantidad,
                visible: true
            }
        })
        const items = form.getValues("items")
        itemsToAdd.forEach(item => {
            const existingIndex = fields.findIndex(i => i.item_menu_id === item.item_menu_id);
            if (existingIndex !== -1) {
                item.cantidad += items[existingIndex].cantidad
                items[existingIndex] = item
            } else {
                items.push(item)
            }
        });
        replace(items)

        setShowAgregarItems(false)

    }


    useEffect(() => {
        if (open) {
            console.log("Fetching items of pedido")
            getPedidoById(pedidoData.id).then(response => {
                const items = response.data.items.map(item => {
                    return {
                        "item_menu_id": item.id.itemMenu.id,
                        "item_menu_nombre": item.id.itemMenu.nombre,
                        "cantidad": item.cantidad,
                        "visible": true
                    }
                })
                replace(items)
            }).catch(e => {
                console.log(e)
                toast({
                    variant: "destructive",
                    title: "Error cargando items del pedido",
                    description: "No se pudieron cargar los items del pedido del sistema",
                })
            })
        }
    }, [open])

    function onSubmit(values: ItemPedidoForm) {
        editItemsOfPedido(pedidoData.id, values.items).then(() => {
            triggerFetchData()
            toast({
                variant: "default",
                title: "Pedido editado",
                description: "Se pudo editar al pedido correctamente",
            })
        }).catch(e => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo editar al pedido correctamente",
            })
        })
        closeEditarItemsOfPedidoDialog()
    }

    return (
        <Dialog open={open} onOpenChange={open ? closeEditarItemsOfPedidoDialog : () => { }}>
            <DialogContent className="max-h-screen overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>EDITAR ITEMS DEL PEDIDO</DialogTitle>
                    <DialogDescription>
                        Completa los campos con la información de los items del pedido
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={isEditable ? form.handleSubmit(onSubmit) : (e) => e.preventDefault()} className="space-y-4">
                        {fields.map((field, index) => (
                            field.visible && (
                                <div key={field.id} className="flex items-center space-x-4">
                                    <hr />
                                    <FormField
                                        control={form.control}
                                        name={`items.${index}`}
                                        render={() => (
                                            <>
                                                <div className="flex space-x-4 flex-1">
                                                    <FormItem className="flex-1">
                                                        <FormLabel>Item</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                value={field.item_menu_nombre}
                                                                readOnly
                                                                className="cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                    <FormItem className="flex-1">
                                                        <FormLabel>Cantidad</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                min={0}
                                                                {...form.register(`items.${index}.cantidad`)}
                                                                disabled={!isEditable}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                    <Input
                                                        type="hidden"
                                                        {...form.register(`items.${index}.item_menu_id`)}
                                                    />
                                                </div>
                                                {isEditable && (
                                                    <Button
                                                        variant="ghost"
                                                        type="button"
                                                        className="ml-2"
                                                        onClick={() => {
                                                            update(index, {
                                                                ...field,
                                                                cantidad: 0,
                                                                visible: false
                                                            });
                                                        }}
                                                    >
                                                        <X />
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                            )
                        ))}
                        {isEditable && (
                            <>
                                <Button type="submit" className="w-32">CONFIRMAR</Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setShowAgregarItems(true)}
                                >
                                    AGREGAR ITEMS
                                </Button>
                            </>
                        )}
                        <DialogClose asChild className="float-right">
                            <Button type="button" className="w-32">
                                CANCELAR
                            </Button>
                        </DialogClose>
                    </form>
                </Form>
            </DialogContent>
            <AgregarItemsToPedidoDialog
                open={showAgregarItems}
                onClose={() => setShowAgregarItems(false)}
                items={availableItems}
                onAddItems={handleAddItems}
            />
        </Dialog>

    )
}
