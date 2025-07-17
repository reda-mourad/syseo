import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState, type ComponentProps } from "react";
import { currentTime } from "../choices";
import { cn } from "../lib/utils";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

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
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTime(initValue);
  }, [initValue]);

  return (
    <Popover
      open={open}
      onOpenChange={() => {
        if (!time.replaceAll(":", "")) setTime(currentTime());
        else setOpen(!open);
      }}
    >
      <PopoverTrigger
        id={`${name} btn`}
        className={cn(
          "focus:bg-violet-100 p-0.5 px-2 border border-gray-400 rounded w-fit min-w-fit h-fit min-h-fit font-mono",
          time && "font-bold",
          className
        )}
        {...props}
      >
        {time || ":"}
        <input type="hidden" value={time} name={name} />
      </PopoverTrigger>
      <PopoverContent className="bg-violet-50 shadow-lg p-2 rounded min-w-fit font-mono font-bold">
        <InputOTP
          autoFocus
          maxLength={4}
          pattern={REGEXP_ONLY_DIGITS}
          className="gap-1"
          value={time.replace(":", "")}
          onChange={(t) => {
            const formatted = t ? t.slice(0, 2) + ":" + t.slice(2) : "";
            setTime(formatted);
          }}
          onComplete={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value === "") {
              setOpen(false);
              return;
            }
            const val = e.currentTarget.value + e.key;
            if (
              (val.length === 1 && parseInt(val) > 2) ||
              (val.length === 2 && parseInt(val) > 23) ||
              (val.length === 3 && parseInt(e.key) > 5)
            ) {
              e.preventDefault();
              return;
            }
          }}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          :
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        {/* <input
          type="time"
          value={time}
          onChange={(e) => {
            setTime(e.currentTarget.value);
          }}
          onBlur={() => setOpen(false)}
          className="min-w-fit"
        /> */}
      </PopoverContent>
    </Popover>
  );
}

interface TimeFieldProps {
  label: string;
  name?: string;
  initValue: string;
}

export function TimeField({ initValue, label, name }: TimeFieldProps) {
  return (
    <div className="flex items-center gap-1">
      <label htmlFor="">{label}</label>
      <TimePicker initValue={initValue} name={name || label} />
    </div>
  );
}
