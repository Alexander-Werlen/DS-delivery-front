"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import EditarPedidoDialog from "./EditarPedidoDialog.tsx"
import EliminarPedidoDialog from "./EliminarPedidoDialog.tsx"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select.tsx"
import { Pedido } from "@/shared.types.ts"

type IdNamePair = {
  id: number,
  nombre: string
}

interface DataTableProps {
  data: Pedido[],
  vendedores: IdNamePair[],
  clientes: IdNamePair[],
  triggerFetchData: () => void
}

export function DataTable({ data, vendedores, clientes, triggerFetchData }: DataTableProps) {
  const [editPedidoDialogData, setEditPedidoDialogData] = useState<{ open: boolean, pedido: Pedido }>({
    open: false,
    pedido: {
      id: -1,
      pago: "",
      vendedor_id: -1,
      vendedor: "",
      cliente: "",
      cliente_id: -1,
      precio_total: -1,
      estado: "RECIBIDO"
    }
  })

  const closeEditDialog = () => {
    setEditPedidoDialogData(self => { return { open: false, pedido: self.pedido } })
  }

  const [eliminarPedidoDialogData, setEliminarPedidoDialogData] = useState<{ open: boolean, pedido: Pedido }>({
    open: false,
    pedido: {
      id: -1,
      pago: "",
      vendedor: "",
      vendedor_id: -1,
      cliente: "",
      cliente_id: -1,
      precio_total: -1,
      estado: "RECIBIDO"
    }
  })

  const closeEliminarDialog = () => {
    setEliminarPedidoDialogData(self => { return { open: false, pedido: self.pedido } })
  }


  //table logic
  const columns: ColumnDef<Pedido>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Id
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("id")}</div>
      ),
      enableSorting: true,
      enableHiding: false,
      filterFn: "equalsString"
    },
    {
      accessorKey: "estado",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Estado
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("estado")}</div>,
    },
    {
      accessorKey: "vendedor",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Vendedor
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("vendedor")}</div>
      ),
      enableSorting: true,
      enableHiding: false,
      filterFn: "equalsString"
    },
    {
      accessorKey: "cliente",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cliente
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("cliente")}</div>
      ),
      enableSorting: true,
      enableHiding: false,
      filterFn: "equalsString"
    },
    {
      accessorKey: "precio_total",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Precio total
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("precio_total"))
        const formatted = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(amount)
        return <div className="">{formatted}</div>
      },
    },
    {
      accessorKey: "pago",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Pago
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("pago") ? row.getValue("pago") : "-"}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const pedido = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setEditPedidoDialogData({ open: true, pedido: pedido })}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setEliminarPedidoDialogData({ open: true, pedido: pedido })}
              >
                Eliminar
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter id..."
            value={(table.getColumn("id")?.getFilterValue() as number) ?? ""}
            onChange={(event) =>
              table.getColumn("id")?.setFilterValue(event.target.value)
            }
            className="max-w-40 mr-2"
          />
          <Select onValueChange={(value) => table.getColumn("estado")?.setFilterValue(value)}>
            <SelectTrigger className="max-w-40 mr-2">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="O">TODOS</SelectItem>
              <SelectItem value="RECIBIDO">RECIBIDO</SelectItem>
              <SelectItem value="ACEPTADO">ACEPTADO</SelectItem>
              <SelectItem value="PREPARADO">PREPARADO</SelectItem>
              <SelectItem value="ENVIADO">ENVIADO</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => table.getColumn("vendedor")?.setFilterValue(value === "all" ? "" : value)}>
            <SelectTrigger className="max-w-40 mr-2">
              <SelectValue placeholder="Vendedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">TODOS</SelectItem>
              {vendedores.map(vendedor => (
                <SelectItem key={vendedor.nombre} value={vendedor.nombre.toString()}>
                  {vendedor.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => table.getColumn("cliente")?.setFilterValue(value === "all" ? "" : value)}>
            <SelectTrigger className="max-w-40 mr-2">
              <SelectValue placeholder="Cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">TODOS</SelectItem>
              {clientes.map(cliente => (
                <SelectItem key={cliente.nombre} value={cliente.nombre.toString()}>
                  {cliente.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <EditarPedidoDialog open={editPedidoDialogData.open} pedidoData={editPedidoDialogData.pedido} closeEditDialog={closeEditDialog} triggerFetchData={triggerFetchData} />
      <EliminarPedidoDialog open={eliminarPedidoDialogData.open} pedidoData={eliminarPedidoDialogData.pedido} closeEliminarDialog={closeEliminarDialog} triggerFetchData={triggerFetchData} />
    </>
  )
}
