import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useState, type ComponentProps } from "react";
import { currentTime } from "../choices";
import { cn } from "../lib/utils";

interface TimePickerProps extends ComponentProps<"button"> {
  name: string;
  initValue: string;
}

export default function TimePicker({
  className,
  name,
  initValue,
  ...props
}: TimePickerProps) {
  const [time, setTime] = useState(initValue);
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={() => {
        if (!time) setTime(currentTime());
        else setOpen(!open);
      }}
    >
      <PopoverTrigger
        className={cn(
          "focus:bg-violet-100 p-0.5 px-2 border border-gray-400 rounded w-fit min-w-fit h-fit min-h-fit",
          className
        )}
        {...props}
      >
        {time || "-- : --"}
        <input type="hidden" value={time} name={name} />
      </PopoverTrigger>
      <PopoverContent className="bg-white shadow-lg p-2 rounded min-w-fit">
        <input
          type="time"
          value={time}
          onChange={(e) => {
            setTime(e.currentTarget.value);
          }}
          onBlur={() => setOpen(false)}
          className="min-w-fit"
        />
      </PopoverContent>
    </Popover>
  );
}
