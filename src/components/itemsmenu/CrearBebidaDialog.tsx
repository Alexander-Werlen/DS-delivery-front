"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"
import { getAllVendedores } from "@/services/vendedorService"
import { Vendedor } from "@/shared.types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
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
import { Checkbox } from "../ui/checkbox"

import { crearBebida } from "@/services/itemMenuService"
import { BebidaForm, BebidaFormSchema } from "./schemas"

const formSchema = BebidaFormSchema
interface CrearBebidaDialogProps {
    triggerFetchData: () => void
}

function CrearBebidaDialog({ triggerFetchData }: CrearBebidaDialogProps) {
    const { toast } = useToast()

    const [open, setOpen] = useState(false)
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
            nombre: "",
            descripcion: "",
            precio: 0,
            vendedor_id: 0,
            vendedor: "",
            esAptoVegano: false,
            esAptoCeliaco: false,
            volumen: 0,
            graduacionAlcoholica: 0,
            esAlcoholica: false,
            esGaseosa: false
        },
    })
    const graduacionAlcoholica = form.watch("graduacionAlcoholica");

    useEffect(() => {
        if (graduacionAlcoholica > 0) {
            form.setValue("esAlcoholica", true);
        }
    }, [graduacionAlcoholica, form]);
    // 2. Define a submit handler.
    function onSubmit(values: BebidaForm) {
        crearBebida({ ...values, "id": 0, "categoria": "BEBIDA" }).then(() => {
            toast({
                variant: "default",
                title: "Bebida creada",
                description: "Se creó la bebida exitosamente",
            })
            triggerFetchData()
        }).catch(e => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Error creando la bebida",
                description: "No se pudo crear la bebida",
            })
        })
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="mr-2 w-40">CREAR ITEM BEBIDA</Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>CREAR ITEM BEBIDA</DialogTitle>
                    <DialogDescription>
                        Completa los campos con la información del item bebida
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Precio ($)</FormLabel>
                                    <FormControl>
                                        <Input required placeholder="" {...field} />
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
                            name="volumen"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Volumen (cc)</FormLabel>
                                    <FormControl>
                                        <Input required placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="graduacionAlcoholica"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Graduacion Alcoholica (°)</FormLabel>
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
                        <FormField
                            control={form.control}
                            name="esAlcoholica"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-2 space-y-0 ">
                                    <FormControl>
                                        <Checkbox
                                            disabled={graduacionAlcoholica > 0}
                                            checked={graduacionAlcoholica > 0 ? true : false}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Es alcoholica
                                        </FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="esGaseosa"
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
                                            Es gaseosa
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

export default CrearBebidaDialog
