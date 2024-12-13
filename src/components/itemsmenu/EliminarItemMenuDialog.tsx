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
import { ItemMenu } from "@/shared.types"

import { useToast } from "@/hooks/use-toast"

import { deleteItemMenu } from "@/services/itemMenuService"

interface EliminarItemMenuDialogProps {
    open: boolean,
    itemMenuData: ItemMenu,
    closeEliminarDialog: () => void,
    triggerFetchData: () => void
}

export default function EliminarItemMenuDialog({open, itemMenuData, closeEliminarDialog, triggerFetchData}: EliminarItemMenuDialogProps) {
    const { toast } = useToast()
    const eliminarItemMenu = (id: number) => {
        deleteItemMenu(id).then(() => {
            toast({
                variant: "default",
                title: "Item menu eliminado",
                description: "Se eliminó al item menu correctamente",
            })
            triggerFetchData()
        }).catch(e => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo eliminar al item menu correctamente",
            })
        })
        closeEliminarDialog()
    }
    return (
        <AlertDialog open={open} onOpenChange={open? closeEliminarDialog : () => {}}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Estas seguro que quieres ELIMINAR al item menu?</AlertDialogTitle>
            <AlertDialogDescription>
                Esta acción no se puede deshacer. Esta acción eliminará permanentemente el item menu de la base de datos.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="float-right" onClick={() => eliminarItemMenu(itemMenuData.id)}>Eliminar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}
  