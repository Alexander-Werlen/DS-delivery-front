import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { Vendedor } from "./tableVendedores"

interface EliminarVendedorDialogProps {
    open: boolean,
    vendedorData: Vendedor,
    closeEliminarDialog: () => void,
    triggerFetchData: () => void
}

export default function EliminarVendedorDialog({open, vendedorData, closeEliminarDialog, triggerFetchData}: EliminarVendedorDialogProps) {
    const eliminarVendedor = (id: number) => {
        //TODO: Eliminar vendedor

        //actualizar datos de la tabla
        triggerFetchData()
        console.log(id)
        closeEliminarDialog()
    }
    return (
        <AlertDialog open={open} onOpenChange={open? closeEliminarDialog : () => {}}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Estas seguro que quieres ELIMINAR al vendedor?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="float-right" onClick={() => eliminarVendedor(vendedorData.id)}>Eliminar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}
  