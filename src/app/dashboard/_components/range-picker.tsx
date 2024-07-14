"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// This type helps with type safety
interface DatePickerWithRangeProps {
  field: {
    onChange: (value: DateRange | undefined) => void;
    value: DateRange | undefined;
  };
}

export function DatePickerWithRange({ field }: DatePickerWithRangeProps) {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value?.from ? (
              field.value.to ? (
                <>
                  {format(field.value.from, "LLL dd, y")} -{" "}
                  {format(field.value.to, "LLL dd, y")}
                </>
              ) : (
                format(field.value.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={field.value?.from}
            selected={field.value}
            onSelect={field.onChange} // Update the form value
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
