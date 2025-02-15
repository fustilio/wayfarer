"use client";

import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Text } from "~/components/ui/text";
import { Check } from "~/lib/icons/Check";
import { ChevronsUpDown } from "~/lib/icons/ChevronsUpDown";
import { cn } from "~/lib/utils";

export type ComboboxOption<T> = {
  label: string;
  value: T;
};

type ComboboxProps<T> = {
  selectedIndex?: number;
  options: ComboboxOption<T>[];
  onSelect: (option: ComboboxOption<T>) => void;
  className?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
};

export function Combobox<T>({
  selectedIndex,
  options,
  onSelect,
  className,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found.",
}: ComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>(
    selectedIndex ? options[selectedIndex]?.label : undefined,
  );

  useEffect(() => {
    if (selectedIndex !== undefined) {
      setValue(options[selectedIndex]?.label);
    }
  }, [selectedIndex, options]);

  return (
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          <Text>
            {value
              ? options.find((option) => option.label === value)?.label
              : placeholder}
          </Text>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[200px] p-0", className)}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.label}
                  value={option.label}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onSelect(option);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.label ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
