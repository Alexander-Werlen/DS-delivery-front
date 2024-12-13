import { z } from "zod";
export const VendededorFormSchema = z.object({
  nombre: z.string(),
  cuit: z
    .string()
    .min(5, {
      message: "CUIT es muy corto.",
    })
    .includes("-", { message: "Formato de CUIT invalido." }),
  direccion: z.string(),
  lat: z.coerce
    .number({
      invalid_type_error: "Latitud debe ser un numero.",
    })
    .min(-90, {
      message: "Latitud debe ser mayor a -90°.",
    })
    .max(90, {
      message: "Latitud debe ser menor a 90°.",
    }),
  lng: z.coerce
    .number({
      invalid_type_error: "Longitud debe ser un numero.",
    })
    .min(-180, {
      message: "Longitud debe ser mayor a -180°.",
    })
    .max(180, {
      message: "Longitud debe ser menor a 180°.",
    }),
});
export type VendedorForm = z.infer<typeof VendededorFormSchema>;
