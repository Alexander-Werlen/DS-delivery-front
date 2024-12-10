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

import { useToast } from "@/hooks/use-toast"

import { deleteCliente } from "@/services/clienteService"


interface EliminarClienteDialogProps {
    open: boolean,
    clienteData: Cliente,
    closeEliminarDialog: () => void,
    triggerFetchData: () => void
}

export default function EliminarClienteDialog({open, clienteData, closeEliminarDialog, triggerFetchData}: EliminarClienteDialogProps) {
    const { toast } = useToast()
    
    const eliminarCliente = (id: number) => {
        deleteCliente(id).then(() => {
            toast({
                variant: "default",
                title: "Cliente eliminado",
                description: "Se eliminó al cliente correctamente",
            })
            triggerFetchData()
        }).catch(e => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo eliminar al cliente correctamente",
            })
        })
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
  