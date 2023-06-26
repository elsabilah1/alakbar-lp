"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { ControllerRenderProps } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Icons } from "../icons"

interface IProps {
  field: ControllerRenderProps<any, any>
  placeholder: string
  inputPlaceholder: string
  loading?: boolean
  options: string[]
}

export function Combobox({
  field,
  options,
  placeholder,
  inputPlaceholder,
  loading,
}: IProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [value, setValue] = React.useState(field.value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? <span className="capitalize">{value}</span> : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={inputPlaceholder}
            onValueChange={(val) => {
              setSearch(val)
            }}
          />
          {loading ? (
            <div className="grid h-10 place-items-center">
              <Icons.loader className="animate-spin" />
            </div>
          ) : (
            <>
              <CommandEmpty>
                <button
                  onClick={() => {
                    setValue(search)
                    field.onChange(search.toLowerCase())
                    setOpen(false)
                  }}
                  className="flex w-full items-center justify-center gap-2"
                >
                  <Icons.plus className="h-4 w-4" /> {search}
                </button>
              </CommandEmpty>
              <CommandGroup>
                {options?.length > 0 ? (
                  options.map((option) => (
                    <CommandItem
                      key={option}
                      onSelect={(currentValue) => {
                        setValue(currentValue)
                        field.onChange(currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option}
                    </CommandItem>
                  ))
                ) : (
                  <CommandItem>Data tidak tersedia.</CommandItem>
                )}
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
