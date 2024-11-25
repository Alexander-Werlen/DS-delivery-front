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
import { Cliente } from "./tableClientes"

interface EliminarClienteDialogProps {
    open: boolean,
    clienteData: Cliente,
    closeEliminarDialog: () => void,
    triggerFetchData: () => void
}

export default function EliminarClienteDialog({open, clienteData, closeEliminarDialog, triggerFetchData}: EliminarClienteDialogProps) {
    const eliminarCliente = (id: number) => {
        //TODO: Eliminar cliente

        //actualizar datos de la tabla
        triggerFetchData()
        console.log(id)
        closeEliminarDialog()
    }
    return (
        <AlertDialog open={open} onOpenChange={open? closeEliminarDialog : () => {}}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Estas seguro que quieres ELIMINAR al cliente?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="float-right" onClick={() => eliminarCliente(clienteData.id)}>Eliminar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}
  