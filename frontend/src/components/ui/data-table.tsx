import {
  ColumnDef,
  flexRender,
  getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState,
  useReactTable,
  getFilteredRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';
import { Input } from '@/components/ui/input.tsx';

interface DataTableProps <TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  children?: React.ReactNode
}

export function DataTable<TData, TValue>( { columns, data, children }: DataTableProps<TData, TValue>){

  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState<any>([])
  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state:{
      sorting,
      globalFilter
    },
  })

  return(
    <div className={'w-full border '}>
    <div className="flex items-center gap-5 min-w-full py-4">
      <Input
        placeholder="Filter..."
        value={(globalFilter ) ?? ""}
        onChange={(event) => table.setGlobalFilter(String(event.target.value)) }
        className="max-w-sm border-slate-300"
      />
      {children}
    </div>
      <div className="flex items-center justify-end space-x-2 py-4">
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

      <div className={'rounded-md border p-2'}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup)=>(
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header)=>{
                    return(
                      <TableHead key={header.id}>
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
              table.getRowModel().rows.map((row)=>(
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell)=>(
                    <TableCell key={cell.id} className='text-ellipsis overflow-hidden max-w-[15px] '>
                      {flexRender(
                        cell.column.columnDef.cell, cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>

              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )
            }
          </TableBody>
        </Table>

      </div>
    </div>
  )

}
