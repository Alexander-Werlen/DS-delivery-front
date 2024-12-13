import { z } from "zod";
export const PedidosCreateFormSchema = z.object({
  vendedor: z.string(),
  cliente: z.string(),
  vendedor_id: z.coerce
    .number({
      invalid_type_error: "vendedor_id must be a number.",
    })
    .nonnegative({ message: "vendedor_id must be a positive number." }),
  cliente_id: z.coerce
    .number({
      invalid_type_error: "cliente_id must be a number.",
    })
    .nonnegative({ message: "cliente_id must be a positive number." }),
});
export type PedidosCreateForm = z.infer<typeof PedidosCreateFormSchema>;

export const PedidosEditFormSchema = PedidosCreateFormSchema.merge(
  z.object({
    estado: z.union([z.literal("RECIBIDO"), z.literal("ENVIADO"), z.literal("PREPARADO"), z.literal("ACEPTADO")]),
  })
);
export type PedidosEditForm = z.infer<typeof PedidosEditFormSchema>;

export const ItemPedidoFormSchema = z.object({
  items: z.array(
    z.object({
      item_menu_id: z.coerce.number(),
      cantidad: z.coerce.number().min(0, {message: "La cantidad no puede ser negativa."}),
    })
  )
});
export type ItemPedidoForm = z.infer<typeof ItemPedidoFormSchema>;
