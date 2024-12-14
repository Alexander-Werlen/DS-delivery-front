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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Eraser, SlidersHorizontal } from "lucide-react"
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

import EliminarItemMenuDialog from "./EliminarItemMenuDialog.tsx"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select.tsx"
import EditarBebidaDialog from "./EditarBebidaDialog.tsx"
import EditarComidaDialog from "./EditarComidaDialog.tsx"
import { ItemMenu, Comida, Bebida, ItemMenuAdvancedFilters } from "@/shared.types.ts"
import FiltrosAvanzadosDialog from "./FiltrosAvanzadosItemMenuDialog.tsx"
import { useEffect } from "react"
interface DataTableProps {
  data: ItemMenu[],
  triggerFetchData: (filter?: ItemMenuAdvancedFilters) => void
}

export function DataTable({ data, triggerFetchData }: DataTableProps) {
  const [showFiltersDialog, setShowFiltersDialog] = useState(false)
  const [advancedFilters, setAdvancedFilters] = useState<ItemMenuAdvancedFilters>({})

  // Add handler for applying filters
  const handleApplyFilters = (filters: ItemMenuAdvancedFilters) => {
    //Remove properties with false
    for (const key in filters) {
      if (filters[key as keyof ItemMenuAdvancedFilters] === false) {
        delete filters[key as keyof ItemMenuAdvancedFilters]
      }
    }
    setAdvancedFilters(filters)
  }
  const [categoriaValue, setCategoriaValue] = useState<string>("")
  const clearFilters = () => {
    // Clear column filters
    table.resetColumnFilters()
    setCategoriaValue("")
    setAdvancedFilters({})
  }
  useEffect(() => {
    triggerFetchData(advancedFilters)
  }, [advancedFilters])

  const [editItemMenuDialogData, setEditItemMenuDialogData] = useState<{ openComida: boolean, openBebida: boolean, itemComida: Comida, itemBebida: Bebida }>({
    openComida: false,
    openBebida: false,
    itemComida: {
      id: -1,
      nombre: "",
      descripcion: "",
      precio: 0,
      categoria: "COMIDA",
      vendedor_id: -1,
      vendedor: "",
      esAptoVegano: false,
      esAptoCeliaco: false,
      peso: 0,
    },
    itemBebida: {
      id: -1,
      nombre: "",
      descripcion: "",
      precio: 0,
      categoria: "BEBIDA",
      vendedor_id: -1,
      vendedor: "",
      esAptoVegano: false,
      esAptoCeliaco: false,
      volumen: 0,
      graduacionAlcoholica: 0,
      esAlcoholica: false,
      esGaseosa: false,
    }
  })

  const closeEditDialog = () => {
    setEditItemMenuDialogData(self => { return { openComida: false, openBebida: false, itemComida: self.itemComida, itemBebida: self.itemBebida } })
  }

  const [eliminarItemMenuDialogData, setEliminarItemMenuDialogData] = useState<{ open: boolean, itemMenu: ItemMenu }>({
    open: false,
    itemMenu: {
      id: -1,
      nombre: "",
      descripcion: "",
      precio: 0,
      categoria: "BEBIDA",
      vendedor_id: -1,
      vendedor: "",
      esAptoVegano: false,
      esAptoCeliaco: false,
      peso: 0,
      volumen: 0,
      graduacionAlcoholica: 0,
      esAlcoholica: false,
      esGaseosa: false,
    }
  })

  const closeEliminarDialog = () => {
    setEliminarItemMenuDialogData(self => { return { open: false, itemMenu: self.itemMenu } })
  }

  //table logic
  const columns: ColumnDef<ItemMenu>[] = [
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
      accessorKey: "descripcion",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Descripción
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("descripcion")}</div>
      ),
    },
    {
      accessorKey: "precio",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Precio
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("precio"))
        const formatted = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(amount)
        return <div className="">{formatted}</div>
      },

    },
    {
      accessorKey: "categoria",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Categoria
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue("categoria")}</div>,
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
      cell: ({ row }) => <div className="">{row.getValue("vendedor")}</div>,
    },
    {
      accessorKey: "esAptoVegano",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            AptoVegano
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue("esAptoVegano") ? "SI" : "NO"}</div>,
    },
    {
      accessorKey: "esAptoCeliaco",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            AptoCeliaco
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue("esAptoCeliaco") ? "SI" : "NO"}</div>,
    },
    {
      accessorKey: "peso",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Peso
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{Number.parseFloat(row.getValue("peso")).toFixed(2) + "g"}</div>,
    },
    {
      accessorKey: "volumen",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Volumen
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("volumen") ? row.getValue("volumen") + "cc" :"-"}</div>,
    },
    {
      accessorKey: "graduacionAlcoholica",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            GraduacionAlcoholica
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("graduacionAlcoholica") ? row.getValue("graduacionAlcoholica") + "°" : "-"}</div>,
    },
    {
      accessorKey: "esAlcoholica",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Alcoholica
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue("esAlcoholica") === true ? "SI" : row.getValue("esAlcoholica") === false ? "NO" : "-"}</div>,
    },
    {
      accessorKey: "esGaseosa",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Gaseosa
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue("esGaseosa") === true ? "SI" : row.getValue("esGaseosa") === false ? "NO" : "-"}</div>,
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const itemMenu = row.original

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
                onClick={() => {
                  if (itemMenu.categoria === "COMIDA") {
                    setEditItemMenuDialogData(self => { return { openComida: true, openBebida: false, itemComida: (itemMenu as Comida), itemBebida: self.itemBebida } })
                  } else {
                    setEditItemMenuDialogData(self => { return { openComida: false, openBebida: true, itemComida: self.itemComida, itemBebida: (itemMenu as Bebida) } })
                  }
                }}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setEliminarItemMenuDialogData(() => { return { open: true, itemMenu: itemMenu } })
                }}
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
          <Select value={categoriaValue}
            onValueChange={(value) => {
              setCategoriaValue(value)
              table.getColumn("categoria")?.setFilterValue(value === "all" ? "" : value)
            }}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">TODOS</SelectItem>
              <SelectItem value="COMIDA">COMIDA</SelectItem>
              <SelectItem value="BEBIDA">BEBIDA</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            className="ml-2"
            onClick={() => setShowFiltersDialog(true)}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="ml-2"
            onClick={clearFilters}
          >
            <Eraser className="h-5 w-5 mr-2" />
          </Button>
          <FiltrosAvanzadosDialog
            open={showFiltersDialog}
            closeDialog={() => setShowFiltersDialog(false)}
            applyFilters={handleApplyFilters}
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
      <EditarComidaDialog open={editItemMenuDialogData.openComida} itemMenuData={editItemMenuDialogData.itemComida} closeEditDialog={closeEditDialog} triggerFetchData={triggerFetchData} />
      <EditarBebidaDialog open={editItemMenuDialogData.openBebida} itemMenuData={editItemMenuDialogData.itemBebida} closeEditDialog={closeEditDialog} triggerFetchData={triggerFetchData} />
      <EliminarItemMenuDialog open={eliminarItemMenuDialogData.open} itemMenuData={eliminarItemMenuDialogData.itemMenu} closeEliminarDialog={closeEliminarDialog} triggerFetchData={triggerFetchData} />
    </>
  )
}
