import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../generales/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { ItemMenuAdvancedFilters } from "@/shared.types"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface FiltrosAvanzadosDialogProps {
  open: boolean
  closeDialog: () => void
  applyFilters: (filters: ItemMenuAdvancedFilters) => void
}

export default function FiltrosAvanzadosDialog({
  open,
  closeDialog,
  applyFilters
}: FiltrosAvanzadosDialogProps) {
  const filterFormSchema: z.ZodSchema = z.object({
    esAptoVegano: z.coerce.boolean().optional(),
    esAptoCeliaco: z.coerce.boolean().optional(),
    esAlcoholica: z.coerce.boolean().optional(),
    esGaseosa: z.coerce.boolean().optional(),
    soloComidas: z.coerce.boolean().optional(),
    soloBebidas: z.coerce.boolean().optional(),
    precioMin: z.coerce.number().min(0).optional(),
    precioMax: z.coerce.number().min(0)
      .refine(val => !val || !form.getValues("precioMin") || val >= form.getValues("precioMin"), {
        message: "El precio máximo debe ser mayor al mínimo"
      })
      .optional(),
    pesoMin: z.coerce.number().min(0).optional(),
    pesoMax: z.coerce.number().min(0)
      .refine(val => !val || !form.getValues("pesoMin") || val >= form.getValues("pesoMin"), {
        message: "El peso máximo debe ser mayor al mínimo"
      })
      .optional(),
    volumenMin: z.coerce.number().min(0).optional(),
    volumenMax: z.coerce.number().min(0)
      .refine(val => !val || !form.getValues("volumenMin") || val >= form.getValues("volumenMin"), {
        message: "El volumen máximo debe ser mayor al mínimo"
      })
      .optional(),
    graduacionAlcoholicaMin: z.coerce.number().min(0).max(100).optional(),
    graduacionAlcoholicaMax: z.coerce.number().min(0).max(100)
      .refine(val => !val || !form.getValues("graduacionAlcoholicaMin") || val >= form.getValues("graduacionAlcoholicaMin"), {
        message: "La graduación máxima debe ser mayor a la mínima"
      })
      .optional()
  })


  const form = useForm<z.infer<typeof filterFormSchema>>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      esAptoVegano: false,
      esAptoCeliaco: false,
      esAlcoholica: false,
      esGaseosa: false,
      soloComidas: false,
      soloBebidas: false,
      precioMin: 0,
      precioMax: undefined,
      pesoMin: 0,
      pesoMax: undefined,
      volumenMin: 0,
      volumenMax: undefined,
      graduacionAlcoholicaMin: 0,
      graduacionAlcoholicaMax: 100
    }
  })

  function onSubmit(data: ItemMenuAdvancedFilters) {
    applyFilters(data)
    closeDialog()
  }

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filtros Generales</DialogTitle>
          <DialogDescription>
            Completa los campos para filtrar los items del menú
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* General Filters */}
            <div className="space-y-4">
              {/* General Checkboxes in 2x2 grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="esAptoVegano"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Apto vegano</FormLabel>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="esAptoCeliaco"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Apto celíaco</FormLabel>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="soloComidas"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Solo Comidas</FormLabel>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="soloBebidas"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Solo Bebidas</FormLabel>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* General Ranges */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="precioMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio mínimo</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="precioMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio máximo</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => {
                            const value = e.target.value === '' ? undefined : Number(e.target.value)
                            field.onChange(value)
                          }}
                            value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pesoMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Peso mínimo (g)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pesoMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Peso máximo (g)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => {
                            const value = e.target.value === '' ? undefined : Number(e.target.value)
                            field.onChange(value)
                          }}
                            value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Bebida Filters Section */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="font-medium">Filtros de bebidas</h3>

              {/* Bebida Checkboxes side by side */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="esAlcoholica"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Bebida alcohólica</FormLabel>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="esGaseosa"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Gaseosa</FormLabel>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bebida Ranges */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="volumenMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Volumen mínimo (cc)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="volumenMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Volumen máximo (cc)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => {
                            const value = e.target.value === '' ? undefined : Number(e.target.value)
                            field.onChange(value)
                          }}
                            value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="graduacionAlcoholicaMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Graduación mínima (°)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="graduacionAlcoholicaMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Graduación máxima (°)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button type="submit">Aplicar Filtros</Button>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}