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

import { crearVendedor } from "@/services/vendedorService"


const formSchema = z.object({
    nombre: z.string(),
    cuit: z.string().min(5, {
        message: "CUIT is too short.",
    }).includes("-", 
        {message: "Invalid CUIT format."}
    ),
    direccion: z.string(),
    lat: z.coerce.number({
        invalid_type_error: "Lat must be a number.",
    }),
    lng: z.coerce.number({
        invalid_type_error: "Lng must be a number.",
    }),
})

interface CrearVendedorDialogProps {
    triggerFetchData: () => void
}

function CrearVendedorDialog({triggerFetchData}: CrearVendedorDialogProps) {
    const { toast } = useToast()

    const [open, setOpen] = useState(false)

    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
            cuit: "",
            direccion: "",
            lat: 0,
            lng: 0
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        crearVendedor({...values, "id": 0}).then(() => {
            toast({
                variant: "default",
                title: "Vendedor creado",
                description: "Se creó el vendedor exitosamente",
            })
            triggerFetchData()
        }).catch(e => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Error creando al vendedor",
                description: "No se pudo crear el vendedor",
            })
        })
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className="mr-2 w-40">CREAR VENDEDOR</Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-y-auto">
            <DialogHeader>
            <DialogTitle>CREAR VENDEDOR</DialogTitle>
            <DialogDescription>
            Completa los campos con la información del vendedor
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
                name="cuit"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>CUIT</FormLabel>
                    <FormControl>
                        <Input required placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="direccion"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Direccion</FormLabel>
                    <FormControl>
                        <Input required placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="lat"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Lat</FormLabel>
                    <FormControl>
                        <Input required placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="lng"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Lng</FormLabel>
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
  
export default CrearVendedorDialog
  