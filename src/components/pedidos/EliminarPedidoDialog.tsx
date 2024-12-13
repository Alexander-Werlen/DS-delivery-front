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
import { Pedido } from "@/shared.types"

import { useToast } from "@/hooks/use-toast"

import { deletePedido } from "@/services/pedidoService"


interface EliminarPedidoDialogProps {
    open: boolean,
    pedidoData: Pedido,
    closeEliminarDialog: () => void,
    triggerFetchData: () => void
}

export default function EliminarPedidoDialog({open, pedidoData, closeEliminarDialog, triggerFetchData}: EliminarPedidoDialogProps) {
    const { toast } = useToast()
    
    const eliminarPedido = (id: number) => {
        deletePedido(id).then(() => {
            toast({
                variant: "default",
                title: "Pedido eliminado",
                description: "Se eliminó al pedido correctamente",
            })
            triggerFetchData()
        }).catch(e => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo eliminar al pedido correctamente",
            })
        })
        closeEliminarDialog()
    }
    return (
        <AlertDialog open={open} onOpenChange={open? closeEliminarDialog : () => {}}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Estas seguro que quieres ELIMINAR al pedido?</AlertDialogTitle>
            <AlertDialogDescription>
                Esta acción no se puede deshacer. Esta acción eliminará permanentemente el pedido de la base de datos.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="float-right" onClick={() => eliminarPedido(pedidoData.id)}>Eliminar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}
  