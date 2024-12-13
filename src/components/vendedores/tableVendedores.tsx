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

import EditarVendedorDialog from "./EditarVendedorDialog.tsx"
import EliminarVendedorDialog from "./EliminarVendedorDialog.tsx"

import { useState } from "react"
import { Vendedor } from "@/shared.types.ts"



interface DataTableProps {
  data: Vendedor[],
  triggerFetchData: () => void
}

export function DataTable({ data, triggerFetchData }: DataTableProps) {

  const [editVendedorDialogData, setEditVendedorDialogData] = useState<{ open: boolean, vendedor: Vendedor }>({
    open: false,
    vendedor: {
      id: -1,
      nombre: "",
      cuit: "",
      direccion: "",
      lat: 0,
      lng: 0
    }
  })

  const closeEditDialog = () => {
    setEditVendedorDialogData(self => { return { open: false, vendedor: self.vendedor } })
  }

  const [eliminarVendedorDialogData, setEliminarVendedorDialogData] = useState<{ open: boolean, vendedor: Vendedor }>({
    open: false,
    vendedor: {
      id: -1,
      nombre: "",
      cuit: "",
      direccion: "",
      lat: 0,
      lng: 0
    }
  })

  const closeEliminarDialog = () => {
    setEliminarVendedorDialogData(self => { return { open: false, vendedor: self.vendedor } })
  }


  //table logic
  const columns: ColumnDef<Vendedor>[] = [
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
        const vendedor = row.original

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
                onClick={() => setEditVendedorDialogData({ open: true, vendedor: vendedor })}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setEliminarVendedorDialogData({ open: true, vendedor: vendedor })}
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
      <EditarVendedorDialog open={editVendedorDialogData.open} vendedorData={editVendedorDialogData.vendedor} closeEditDialog={closeEditDialog} triggerFetchData={triggerFetchData} />
      <EliminarVendedorDialog open={eliminarVendedorDialogData.open} vendedorData={eliminarVendedorDialogData.vendedor} closeEliminarDialog={closeEliminarDialog} triggerFetchData={triggerFetchData} />
    </>
  )
}
