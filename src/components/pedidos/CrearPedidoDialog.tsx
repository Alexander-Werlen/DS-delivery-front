"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Input } from "@/components/ui/input"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../generales/dialog"
import { useState } from "react"

import { crearPedido } from "@/services/pedidoService"

const formSchema = z.object({
    vendedor_id: z.coerce.number({
        invalid_type_error: "vendedor_id must be a number.",
    }),
    cliente_id: z.coerce.number({
        invalid_type_error: "cliente_id must be a number.",
    }),
})

interface CrearPedidoDialogProps {
    triggerFetchData: () => void
}

function CrearPedidoDialog({triggerFetchData}: CrearPedidoDialogProps) {
    const { toast } = useToast()

    const [open, setOpen] = useState(false)

    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vendedor_id: 0,
            cliente_id: 0,
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values) {
        crearPedido({...values, "estado": "RECIBIDO", "pago": "", "id": 0, "precio_total": 0}).then(() => {
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
                    <FormLabel>Vendedor Id</FormLabel>
                    <FormControl>
                        <Input required placeholder="" {...field} />
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
                    <FormLabel>Cliente Id</FormLabel>
                    <FormControl>
                        <Input required placeholder="" {...field} />
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
  