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
import { ItemMenu } from "./tableItemsMenu"

interface EliminarItemMenuDialogProps {
    open: boolean,
    itemMenuData: ItemMenu,
    closeEliminarDialog: () => void,
    triggerFetchData: () => void
}

export default function EliminarItemMenuDialog({open, itemMenuData, closeEliminarDialog, triggerFetchData}: EliminarItemMenuDialogProps) {
    const eliminarItemMenu = (id: number) => {
        //TODO: Eliminar ItemMenu

        //actualizar datos de la tabla
        triggerFetchData()
        console.log(id)
        closeEliminarDialog()
    }
    return (
        <AlertDialog open={open} onOpenChange={open? closeEliminarDialog : () => {}}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Estas seguro que quieres ELIMINAR al item menu?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
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
  