"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../generales/dialog"

import { Cliente, Pedido, Vendedor } from "@/shared.types"
import { useEffect, useState } from "react"

import { editarPedido } from "@/services/pedidoService"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { PedidosEditFormSchema, PedidosEditForm } from "./schemas"
import { getAllClientes } from "@/services/clienteService"
import { getAllVendedores } from "@/services/vendedorService"


interface EditarPedidoDialogProps {
    open: boolean,
    pedidoData: Pedido,
    closeEditDialog: () => void,
    triggerFetchData: () => void
}

const formSchema = PedidosEditFormSchema

function EditarPedidoDialog({ open, pedidoData, closeEditDialog, triggerFetchData }: EditarPedidoDialogProps) {
    const { toast } = useToast()

    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vendedor_id: pedidoData.vendedor_id,
            vendedor: pedidoData.vendedor,
            cliente: pedidoData.cliente,
            cliente_id: pedidoData.cliente_id,
            estado: pedidoData.estado
        },
    })
    const [vendedores, setVendedores] = useState<Vendedor[]>([])
    const [clientes, setClientes] = useState<Cliente[]>([])

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
                setClientes(clientesResponse)
            }).catch(e => {
                console.log(e)
                toast({
                    variant: "destructive",
                    title: "Error cargando clientes",
                    description: "No se pudieron cargar los clientes del sistema",
                })
            })
        }
    }, [open, toast])

    useEffect(() => {
        form.reset(pedidoData)
    }, [open])

    //form.reset(pedidoData)
    // 2. Define a submit handler.
    function onSubmit(values: PedidosEditForm) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        //Actualizar los datos de la tabla
        editarPedido({ ...values, "pago": "", "id": pedidoData.id, "precio_total": 0 }).then(() => {
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
        closeEditDialog()
    }
    return (
        <Dialog open={open} onOpenChange={open ? closeEditDialog : () => { }}>
            <DialogContent className="max-h-screen overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>EDITAR PEDIDO</DialogTitle>
                    <DialogDescription>
                        Completa los campos con la información del pedido
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            name="cliente_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cliente</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value === 0 ? undefined : field.value.toString()}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar vendedor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {clientes.map(cliente => (
                                                    <SelectItem key={cliente.id} value={cliente.id.toString()}>
                                                        {cliente.nombre}
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
                            name="estado"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar estado" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="RECIBIDO">RECIBIDO</SelectItem>
                                            <SelectItem value="ACEPTADO">ACEPTADO</SelectItem>
                                            <SelectItem value="PREPARADO">PREPARADO</SelectItem>
                                            <SelectItem value="ENVIADO">ENVIADO</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="float-left w-32">EDITAR</Button>
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

export default EditarPedidoDialog
