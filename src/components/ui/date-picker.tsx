"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FormControl } from "@/components/ui/form"
import { SelectSingleEventHandler } from "react-day-picker"

type DatePickerProps = {
  label: string
  field: any
  value?: Date
  onChange?: SelectSingleEventHandler
  className?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DatePicker = React.forwardRef((props: DatePickerProps, ref) => {
  // const [date, setDate] = React.useState<Date>()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !props.value && "text-muted-foreground",
              props.className
            )}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {props.value ? format(props.value, "PPP") : <span>{props.label}</span>}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={props.value}
          onSelect={props.onChange}
          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
})
