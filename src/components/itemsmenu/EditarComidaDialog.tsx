"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { getAllVendedores } from "@/services/vendedorService"
import { Vendedor } from "@/shared.types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Button } from "@/components/ui/button"
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

import { Comida } from "@/shared.types"
import { useEffect } from "react"
import { Checkbox } from "../ui/checkbox"

import { editarComida } from "@/services/itemMenuService"
import { ComidaForm, ComidaFormSchema } from "./schemas"

interface EditarComidaDialogProps {
    open: boolean,
    itemMenuData: Comida,
    closeEditDialog: () => void,
    triggerFetchData: () => void
}

const formSchema = ComidaFormSchema

function EditarComidaDialog({ open, itemMenuData, closeEditDialog, triggerFetchData }: EditarComidaDialogProps) {
    const { toast } = useToast()
    const [vendedores, setVendedores] = useState<Vendedor[]>([])
    useEffect(() => {
        if (open) {
            getAllVendedores().then(response => {
                const vendedoresResponse: Vendedor[] = response.data.map(v => {
                    return {
                        "id": v.id,
                        "nombre": v.nombre,
                        "cuit": v.cuit,
                        "direccion": v.direccion,
                        "lat": v.coordenada.latitud,
                        "lng": v.coordenada.longitud,
                    }
                })
                setVendedores(vendedoresResponse)
            }).catch(e => {
                console.log(e)
                toast({
                    variant: "destructive",
                    title: "Error cargando vendedores",
                    description: "No se pudieron cargar los vendedores del sistema",
                })
            })
        }
    }, [open, toast])
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: itemMenuData.nombre,
            descripcion: itemMenuData.descripcion,
            precio: itemMenuData.precio,
            categoria: itemMenuData.categoria,
            vendedor_id: itemMenuData.vendedor_id,
            vendedor: itemMenuData.vendedor,
            esAptoVegano: itemMenuData.esAptoVegano,
            esAptoCeliaco: itemMenuData.esAptoCeliaco,
            peso: itemMenuData.peso,
        },
    })

    useEffect(() => {
        form.reset(itemMenuData)
    }, [open])

    //form.reset(itemMenuData)
    // 2. Define a submit handler.
    function onSubmit(values: ComidaForm) {
        editarComida({ ...values, "id": itemMenuData.id, "categoria": "COMIDA" }).then(() => {
            triggerFetchData()
            toast({
                variant: "default",
                title: "Comida editada",
                description: "Se pudo editar la comida correctamente",
            })
        }).catch(e => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo editar la comida correctamente",
            })
        })
        closeEditDialog()
    }
    return (
        <Dialog open={open} onOpenChange={open ? closeEditDialog : () => { }}>
            <DialogContent className="max-h-screen overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>EDITAR ITEM COMIDA</DialogTitle>
                    <DialogDescription>
                        Completa los campos con la información del item comida
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input required placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="descripcion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripcion</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="precio"
                            render={({ fieInputld }) => (
                                <FormItem>
                                    <FormLabel>Precio ($)</FormLabel>
                                    <FormControl>
                                        < required placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vendedor_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vendedor</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value === 0 ? undefined : field.value.toString()}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar vendedor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {vendedores.map(vendedor => (
                                                    <SelectItem key={vendedor.id} value={vendedor.id.toString()}>
                                                        {vendedor.nombre}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="peso"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Peso (g)</FormLabel>
                                    <FormControl>
                                        <Input required placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="esAptoVegano"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-2 space-y-0 ">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Apto vegano
                                        </FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="esAptoCeliaco"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-2 space-y-0 ">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Apto celiaco
                                        </FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button type="submit" className="float-left w-32">CREAR</Button>
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

export default EditarComidaDialog
