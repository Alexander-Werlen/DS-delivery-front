import z from "zod"

export const ClienteFormSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    email: z.string().email(),
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
export type ClienteForm = z.infer<typeof ClienteFormSchema>