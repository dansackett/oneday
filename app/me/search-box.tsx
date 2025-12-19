'use client';

import { useEffect, useState } from "react";

const useDebounceStr = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(()=> {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}


export function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounceStr(searchTerm, 500);

  useEffect(() => {
    console.log(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h2 className="font-bold text-2xl mb-4">Search</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
