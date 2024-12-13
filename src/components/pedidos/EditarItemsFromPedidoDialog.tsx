"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"


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

import { useEffect } from "react"

import { Pedido } from "@/shared.types"

import { useToast } from "@/hooks/use-toast"

import { getPedidoById, editItemsOfPedido } from "@/services/pedidoService"

import { ItemPedidoFormSchema, ItemPedidoForm } from "./schemas"
import { Button } from "../ui/button"

interface EditarItemsOfPedidoDialogProps {
    open: boolean,
    pedidoData: Pedido,
    closeEditarItemsOfPedidoDialog: () => void,
    triggerFetchData: () => void
}
const formSchema = ItemPedidoFormSchema

export default function EditarItemsOfPedidoDialog({open, pedidoData, closeEditarItemsOfPedidoDialog, triggerFetchData}: EditarItemsOfPedidoDialogProps) {
    const { toast } = useToast()

    // 1. Define your form.
    const form = useForm<ItemPedidoForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            items: []
        }
    })

    const { fields, replace, append } = useFieldArray({ name: "items", control: form.control });

    useEffect(() => {
        if (open) {
            getPedidoById(pedidoData.id).then(response => {
                const items = response.data.items.map(item => {
                    return {
                        "item_menu_id": item.id.itemMenu.id,
                        "cantidad": item.cantidad
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

    const agregarItem = () => {
        append({
            "item_menu_id": 0,
            "cantidad": 0
        })
    }

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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {
                        fields.map((field, index) => (
                            <div key={field.id}>
                            <hr/>
                            <FormField
                            control={form.control}
                            name={`items.${index}`}
                            render={() => (
                              <>
                                <FormItem>
                                  <FormLabel>Item Menu Id</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...form.register(`items.${index}.item_menu_id`)}
                                      // defaultValue={field.name}
                                      // value={field.value.city}
                                      // onChange={(e) => field.onChange(e.target.value)}
                                      // onBlur={(e) => field.onBlur(e.target.value)}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                                <FormItem>
                                  <FormLabel>Cantidad</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...form.register(`items.${index}.cantidad`)}
                                      // defaultValue={field.name}
                                      // value={field.value.city}
                                      // onChange={(e) => field.onChange(e.target.value)}
                                      // onBlur={(e) => field.onBlur(e.target.value)}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              </>
                            )}
                            />
                            </div>
                        ))
                        }
                        <Button type="submit" className="w-32">EDITAR</Button>
                        <Button type="button" className="w-32 ml-4" onClick={() => agregarItem()}>AGREGAR ITEM</Button>
                        <DialogClose asChild className="float-right">
                            <Button type="button" className="w-32">
                                CANCELAR
                            </Button>
                        </DialogClose>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
  