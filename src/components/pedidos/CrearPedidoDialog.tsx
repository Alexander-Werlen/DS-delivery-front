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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../generales/dialog"
import { useEffect, useState } from "react"

import { crearPedido } from "@/services/pedidoService"
import { PedidosCreateFormSchema, PedidosCreateForm } from "./schemas"
import { getAllVendedores } from "@/services/vendedorService"
import { getAllClientes } from "@/services/clienteService"
import { Cliente, Vendedor } from "@/shared.types"

const formSchema = PedidosCreateFormSchema

interface CrearPedidoDialogProps {
    triggerFetchData: () => void
}

function CrearPedidoDialog({ triggerFetchData }: CrearPedidoDialogProps) {
    const { toast } = useToast()

    const [open, setOpen] = useState(false)
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
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vendedor_id: 0,
            vendedor: "",
            cliente_id: 0,
            cliente: "",
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: PedidosCreateForm) {
        crearPedido({ ...values, "estado": "RECIBIDO", "pago": "", "id": 0, "precio_total": 0 }).then(() => {
            toast({
                variant: "default",
                title: "Pedido creado",
                description: "Se creó el pedido exitosamente",
            })
            triggerFetchData()
        }).catch(e => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Error creando al pedido",
                description: "No se pudo crear el pedido",
            })
        })

        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="mr-2 w-40">CREAR PEDIDO</Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>CREAR PEDIDO</DialogTitle>
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

export default CrearPedidoDialog
