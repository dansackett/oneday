'use client';

import { Fragment, useState, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { lora, poppins } from "@/lib/fonts";
import { useDebounceStr } from "@/lib/use-debounce";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


interface EntryFieldProps {
  name: string;
  label: string;
  value: string | null | undefined;
  placeholder: string;
  onSave: (value: string) => Promise<void>;
}

export default function EntryField({
  name,
  label,
  value: initialValue,
  placeholder,
  onSave,
}: EntryFieldProps) {
  const [value, setValue] = useState(initialValue || '');
  const debouncedValue = useDebounceStr(value, 500);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // handle focusing field
  useEffect(() => {
    textareaRef.current?.focus();
    const len = textareaRef.current?.value.length || 0;
    textareaRef.current?.setSelectionRange(len, len);
  }, [textareaRef]);

  // handle auto resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  useEffect(() => {
    // return early for null or undefined in debouncedValue or initialValue but allow empty string
    if (!debouncedValue && debouncedValue !== '') {
      return;
    }

    if (!initialValue && initialValue !== '') {
      return;
    }

    if (debouncedValue.trim() === initialValue.trim()) {
      return;
    }

    onSave(debouncedValue);
  }, [debouncedValue, initialValue, onSave]);

  return (
    <Fragment>
      <Label htmlFor={name} className={cn(lora.className, "text-4xl weight-500 text-slate-950 mb-1")}>
        { label }
      </Label>

      <Textarea
        id={name}
        className={cn(poppins.className, "text-slate-600 w-full !text-lg py-3 px-0 resize-none bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 !outline-none ring-0 focus:ring-0 focus:outline-none !leading-8 selection:bg-neutral-200")}
        ref={textareaRef}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
    </Fragment>
  );
}
