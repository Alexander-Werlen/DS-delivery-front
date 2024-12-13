"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getAllVendedores } from "@/services/vendedorService"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue  } from "../ui/select"
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
import { Vendedor } from "../vendedores/tableVendedores"
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

import { crearComida } from "@/services/itemMenuService"

const formSchema = z.object({
    nombre: z.string(),
    descripcion: z.string(),
    precio: z.coerce.number().positive(),
    vendedor_id: z.coerce.number(),
    vendedor: z.coerce.string(),
    esAptoVegano: z.boolean(),
    esAptoCeliaco: z.boolean(),
    peso: z.coerce.number().positive(),
})

interface CrearComidaDialogProps {
    triggerFetchData: () => void
}

function CrearComidaDialog({triggerFetchData}: CrearComidaDialogProps) {
    const { toast } = useToast()

    const [open, setOpen] = useState(false)

    const [vendedores, setVendedores] = useState<Vendedor[]>([])
    useEffect(() => {
        // Fetch vendedores data
        getAllVendedores().then(response => {
          setVendedores(response.data)
        }).catch(e => {
          console.log(e)
          toast({
            variant: "destructive",
            title: "Error cargando vendedores",
            description: "No se pudieron cargar los vendedores del sistema",
          })
        })
      }, [])
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
            peso: 0,
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        crearComida({...values, "id": 0, "categoria": "COMIDA"}).then(() => {
            toast({
                variant: "default",
                title: "Comida creada",
                description: "Se creó la comida exitosamente",
            })
            triggerFetchData()
        }).catch(e => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Error creando la comida",
                description: "No se pudo crear la comida",
            })
        })
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className="mr-2 w-40">CREAR ITEM COMIDA</Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-y-auto">
            <DialogHeader>
            <DialogTitle>CREAR ITEM COMIDA</DialogTitle>
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
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Precio</FormLabel>
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
                name="peso"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Peso</FormLabel>
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
  
export default CrearComidaDialog
