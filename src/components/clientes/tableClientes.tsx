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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Eraser } from "lucide-react"

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

import EditarClienteDialog from "./EditarClienteDialog.tsx"
import EliminarClienteDialog from "./EliminarClienteDialog.tsx"

import { useState } from "react"
import { Cliente } from "@/shared.types.ts"

interface DataTableProps {
  data: Cliente[],
  triggerFetchData: () => void
}

export function DataTable({ data, triggerFetchData }: DataTableProps) {

  const [editClienteDialogData, setEditClienteDialogData] = useState<{ open: boolean, cliente: Cliente }>({
    open: false,
    cliente: {
      id: -1,
      nombre: "",
      apellido: "",
      cuit: "",
      email: "",
      direccion: "",
      lat: 0,
      lng: 0
    }
  })
  const clearFilters = () => {
    // Clear column filters
    table.resetColumnFilters()
  }
  const closeEditDialog = () => {
    setEditClienteDialogData(self => { return { open: false, cliente: self.cliente } })
  }

  const [eliminarClienteDialogData, setEliminarClienteDialogData] = useState<{ open: boolean, cliente: Cliente }>({
    open: false,
    cliente: {
      id: -1,
      nombre: "",
      apellido: "",
      cuit: "",
      email: "",
      direccion: "",
      lat: 0,
      lng: 0
    }
  })

  const closeEliminarDialog = () => {
    setEliminarClienteDialogData(self => { return { open: false, cliente: self.cliente } })
  }


  //table logic
  const columns: ColumnDef<Cliente>[] = [
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
      accessorKey: "nombre",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("nombre")}</div>
      ),
    },
    {
      accessorKey: "apellido",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Apellido
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("apellido")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "cuit",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CUIT
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("cuit")}</div>,
    },
    {
      accessorKey: "direccion",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Dirección
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("direccion")}</div>,
    },
    {
      accessorKey: "lat",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Lat
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const formatted = Number.parseFloat(row.getValue("lat")).toFixed(2) + "°"
        return <div className="lowercase">{formatted}</div>
      },
    },
    {
      accessorKey: "lng",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Lng
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const formatted = Number.parseFloat(row.getValue("lng")).toFixed(2) + "°"
        return <div className="lowercase">{formatted}</div>
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const cliente = row.original

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
                onClick={() => setEditClienteDialogData({ open: true, cliente: cliente })}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setEliminarClienteDialogData({ open: true, cliente: cliente })}
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
          <Input
            placeholder="Filter nombre..."
            value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("nombre")?.setFilterValue(event.target.value)
            }
            className="max-w-40 mr-2"
          />
          <Input
            placeholder="Filter apellido..."
            value={(table.getColumn("apellido")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("apellido")?.setFilterValue(event.target.value)
            }
            className="max-w-40 mr-2"
          />
          <Input
            placeholder="Filter cuit..."
            value={(table.getColumn("cuit")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("cuit")?.setFilterValue(event.target.value)
            }
            className="max-w-40 mr-2"
          />
          <Input
            placeholder="Filter dirección..."
            value={(table.getColumn("direccion")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("direccion")?.setFilterValue(event.target.value)
            }
            className="max-w-40 mr-2"
          />
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-40 mr-2"
          />
          <Button
            variant="ghost"
            className="ml-2"
            onClick={clearFilters}
          >
            <Eraser className="h-5 w-5 mr-4" />
          </Button>
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
      <EditarClienteDialog open={editClienteDialogData.open} clienteData={editClienteDialogData.cliente} closeEditDialog={closeEditDialog} triggerFetchData={triggerFetchData} />
      <EliminarClienteDialog open={eliminarClienteDialogData.open} clienteData={eliminarClienteDialogData.cliente} closeEliminarDialog={closeEliminarDialog} triggerFetchData={triggerFetchData} />
    </>
  )
}
