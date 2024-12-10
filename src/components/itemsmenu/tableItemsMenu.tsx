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

import EliminarItemMenuDialog from "./EliminarItemMenuDialog.tsx"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select.tsx"
import EditarBebidaDialog from "./EditarBebidaDialog.tsx"
import EditarComidaDialog from "./EditarComidaDialog.tsx"


export type ItemMenu = {
  id: number,
  nombre: string,
  descripcion: string,
  precio: number,
  categoria: "COMIDA" | "BEBIDA",
  vendedor: number,
  esAptoVegano: boolean,
  esAptoCeliaco: boolean,
  peso: number | null,
  volumen: number | null,
  graduacionAlcoholica: number | null,
  esAlcoholica: boolean | null,
  esGaseosa: boolean | null
}

export type Comida = {
  id: number,
  nombre: string,
  descripcion: string,
  precio: number,
  categoria: "COMIDA",
  vendedor: number,
  esAptoVegano: boolean,
  esAptoCeliaco: boolean,
  peso: number,
}

export type Bebida = {
  id: number,
  nombre: string,
  descripcion: string,
  precio: number,
  categoria: "BEBIDA",
  vendedor: number,
  esAptoVegano: boolean,
  esAptoCeliaco: boolean,
  volumen: number ,
  graduacionAlcoholica: number,
  esAlcoholica: boolean,
  esGaseosa: boolean
}

interface DataTableProps {
  data: ItemMenu[],
  triggerFetchData:  () => void
}

export function DataTable({data, triggerFetchData}: DataTableProps) {
  
  const [editItemMenuDialogData, setEditItemMenuDialogData] = useState<{openComida: boolean, openBebida: boolean, itemComida: Comida, itemBebida: Bebida}>({
    openComida: false,
    openBebida: false,
    itemComida: {
      id: -1,
      nombre: "",
      descripcion: "",
      precio: 0,
      categoria: "COMIDA",
      vendedor: -1,
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
      vendedor: -1,
      esAptoVegano: false,
      esAptoCeliaco: false,
      volumen: 0,
      graduacionAlcoholica: 0,
      esAlcoholica: false,
      esGaseosa: false,
    }
  })

  const closeEditDialog = () => {
    setEditItemMenuDialogData(self => {return {openComida: false, openBebida: false, itemComida: self.itemComida, itemBebida: self.itemBebida}})
  }

  const [eliminarItemMenuDialogData, setEliminarItemMenuDialogData] = useState<{open: boolean,  itemMenu: ItemMenu}>({
    open: false,
    itemMenu: {
      id: -1,
      nombre: "",
      descripcion: "",
      precio: 0,
      categoria: "BEBIDA",
      vendedor: -1,
      esAptoVegano: false,
      esAptoCeliaco: false,
      peso:0,
      volumen: 0,
      graduacionAlcoholica: 0,
      esAlcoholica: false,
      esGaseosa: false,
    }
  })

  const closeEliminarDialog = () => {
    setEliminarItemMenuDialogData(self => {return {open: false,  itemMenu: self.itemMenu}})
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
      cell: ({ row }) => <div className="lowercase">{row.getValue("precio")}</div>,

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
      cell: ({ row }) => <div className="lowercase">{row.getValue("categoria")}</div>,
    },
    {
      accessorKey: "vendedor",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Vendedor_Id
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("vendedor")}</div>,
    },
    {
      accessorKey: "esAptoVegano",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            EsAptoVegano
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("esAptoVegano")?.toString()}</div>,
    },
    {
      accessorKey: "esAptoCeliaco",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            EsAptoCeliaco
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("esAptoCeliaco")?.toString()}</div>,
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
      cell: ({ row }) => <div className="lowercase">{row.getValue("peso")}</div>,
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
      cell: ({ row }) => <div className="lowercase">{row.getValue("volumen")}</div>,
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
      cell: ({ row }) => <div className="lowercase">{row.getValue("graduacionAlcoholica")}</div>,
    },
    {
      accessorKey: "esAlcoholica",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            EsAlcoholica
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("esAlcoholica")?.toString()}</div>,
    },
    {
      accessorKey: "esGaseosa",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            EsGaseosa
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("esGaseosa")?.toString()}</div>,
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
                  if(itemMenu.categoria === "COMIDA") {
                    setEditItemMenuDialogData(self => {return {openComida: true, openBebida: false, itemComida: (itemMenu as Comida), itemBebida: self.itemBebida}})
                  } else {
                    setEditItemMenuDialogData(self => {return {openComida: false, openBebida: true, itemComida: self.itemComida, itemBebida: (itemMenu as Bebida)}})
                  }
                }}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setEliminarItemMenuDialogData(() => {return {open: true, itemMenu: itemMenu}})
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
        <Select onValueChange={(value) => table.getColumn("categoria")?.setFilterValue(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A">TODOS</SelectItem>
            <SelectItem value="COMIDA">COMIDA</SelectItem>
            <SelectItem value="BEBIDA">BEBIDA</SelectItem>
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
    <EditarComidaDialog open={editItemMenuDialogData.openComida} itemMenuData={editItemMenuDialogData.itemComida} closeEditDialog={closeEditDialog} triggerFetchData={triggerFetchData}/>
    <EditarBebidaDialog open={editItemMenuDialogData.openBebida} itemMenuData={editItemMenuDialogData.itemBebida} closeEditDialog={closeEditDialog} triggerFetchData={triggerFetchData}/>
    <EliminarItemMenuDialog open={eliminarItemMenuDialogData.open} itemMenuData={eliminarItemMenuDialogData.itemMenu} closeEliminarDialog={closeEliminarDialog} triggerFetchData={triggerFetchData}/>
    </>
  )
}
