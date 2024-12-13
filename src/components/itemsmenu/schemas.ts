import z from "zod";
export const BebidaFormSchema = z
  .object({
    nombre: z.string(),
    descripcion: z.string(),
    precio: z.coerce.number().positive({ message: "Precio debe ser un número positivo." }),
    vendedor_id: z.coerce.number(),
    vendedor: z.coerce.string(),
    esAptoVegano: z.boolean(),
    esAptoCeliaco: z.boolean(),
    volumen: z.coerce.number().positive({ message: "Volumen debe ser un número positivo." }),
    graduacionAlcoholica: z.coerce.number().nonnegative({ message: "Graduación alcohólica debe ser un número positivo." }),
    esAlcoholica: z.boolean(),
    esGaseosa: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.graduacionAlcoholica > 0) {
        return data.esAlcoholica === true;
      }
      return true;
    },
    {
      message: "Una bebida con graduación alcohólica debe ser marcada como alcohólica.",
      path: ["esAlcoholica"],
    }
  );
export type BebidaForm = z.infer<typeof BebidaFormSchema>;

export const ComidaFormSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
  precio: z.coerce.number().positive({ message: "Precio debe ser un número positivo." }),
  vendedor_id: z.coerce.number(),
  vendedor: z.coerce.string(),
  esAptoVegano: z.boolean(),
  esAptoCeliaco: z.boolean(),
  peso: z.coerce.number().positive({ message: "Peso debe ser un número positivo." }),
});
export type ComidaForm = z.infer<typeof ComidaFormSchema>;
