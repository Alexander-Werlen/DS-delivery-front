// AgregarItemsDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../generales/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ItemMenu } from "@/shared.types"
import { useEffect, useState } from "react"

interface AgregarItemsToPedidoDialogProps {
  open: boolean
  onClose: () => void
  items: ItemMenu[]
  onAddItems: (selectedItems: Array<{ item_menu_id: number, cantidad: number }>) => void
}

export function AgregarItemsToPedidoDialog({ open, onClose, items, onAddItems }: AgregarItemsToPedidoDialogProps) {
  const [selectedItems, setSelectedItems] = useState<Map<number, number>>(new Map())

  const handleQuantityChange = (itemId: number, quantity: string) => {
    const numQuantity = parseInt(quantity) || 0
    if (numQuantity > 0) {
      setSelectedItems(new Map(selectedItems.set(itemId, numQuantity)))
    } else {
      const newItems = new Map(selectedItems)
      newItems.delete(itemId)
      setSelectedItems(newItems)
    }
  }

  const handleAddItems = () => {
    const itemsToAdd = Array.from(selectedItems.entries()).map(([itemId, quantity]) => ({
      item_menu_id: itemId,
      cantidad: quantity
    }))
    onAddItems(itemsToAdd)

    onClose()
  }
  useEffect(() => {
    if (!open)
      setSelectedItems(new Map())
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Agregar Items</DialogTitle>
        </DialogHeader>
        <div className="max-h-[600px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Cantidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell>{item.descripcion}</TableCell>
                  <TableCell>{new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(item.precio)}</TableCell>
                  <TableCell>{item.categoria}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      value={selectedItems.get(item.id) || ""}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="w-20"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button onClick={onClose} variant="outline">Cancelar</Button>
          <Button onClick={handleAddItems} disabled={selectedItems.size === 0}>
            Agregar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}