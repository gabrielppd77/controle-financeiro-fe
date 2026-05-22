import { useEffect, useState } from "react";
import TextField, { type TextFieldProps } from "./TextField";
import useDebounce from "@hooks/useDebounce";

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
  const debouncedValue = useDebounce(search, 100);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <TextField
      {...props}
      onChange={(e) => setSearch(e.target.value)}
      value={search}
    />
  );
}
