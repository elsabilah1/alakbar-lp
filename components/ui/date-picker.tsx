"use client"

import * as React from "react"
import { IValues } from "@/store/slices/donationSlice"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { ControllerRenderProps } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { FormControl } from "./form"

interface IProps {
  field: ControllerRenderProps<any, any>
}

export function DatePicker({ field }: IProps) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl className="w-full">
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                format(new Date(field.value), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={new Date(field.value)}
            onSelect={(date) => field.onChange(date?.toISOString())}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
