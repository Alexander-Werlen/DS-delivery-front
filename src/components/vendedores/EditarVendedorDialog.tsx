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
} from "../generales/dialog"

import {Vendedor} from "./tableVendedores"
import { useEffect } from "react"

import { editarVendedor } from "@/services/vendedorService"


interface EditarVendedorDialogProps {
    open: boolean,
    vendedorData: Vendedor,
    closeEditDialog: () => void,
    triggerFetchData: () => void
}

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

function EditarVendedorDialog({open, vendedorData, closeEditDialog, triggerFetchData}: EditarVendedorDialogProps) {
    const { toast } = useToast()

    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: vendedorData.id,
            nombre: vendedorData.nombre,
            cuit: vendedorData.cuit,
            direccion: vendedorData.direccion,
            lat: vendedorData.lat,
            lng: vendedorData.lng
        },
    })

    useEffect(() => {
        form.reset(vendedorData)
    }, [open])
    
    //form.reset(vendedorData)
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        editarVendedor({...values, "id": vendedorData.id}).then(() => {
            triggerFetchData()
            toast({
                variant: "default",
                title: "Vendedor editado",
                description: "Se pudo editar al vendedor correctamente",
            })
        }).catch(e => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo editar al vendedor correctamente",
            })
        })
        closeEditDialog()
    }
    return (
        <Dialog open={open} onOpenChange={open? closeEditDialog : () => {}}>
        <DialogContent className="max-h-screen overflow-y-auto">
            <DialogHeader>
            <DialogTitle>EDITAR VENDEDOR</DialogTitle>
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
                        <Input required {...field} />
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
  
export default EditarVendedorDialog
  