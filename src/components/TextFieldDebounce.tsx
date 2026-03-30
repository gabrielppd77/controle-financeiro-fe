import { useEffect, useRef, useState } from "react";
import TextField, { type TextFieldProps } from "./TextField";

interface TextFieldDebounceProps extends Omit<TextFieldProps, "onChange"> {
  value?: string;
  onChange: (d?: string) => void;
}

export default function TextFieldDebounce({
  onChange,
  value,
  ...props
}: TextFieldDebounceProps) {
  const [search, setSearch] = useState(value);
  const debounceRef = useRef<number>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onChange(search);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <TextField
      {...props}
      onChange={(e) => setSearch(e.target.value)}
      value={search}
    />
  );
}
