import { useEffect, useState } from "react";
import useDebounce from "@hooks/useDebounce";
import DatePicker, { type DatePickerProps } from "./DatePicker";
import type { PickerValue } from "@mui/x-date-pickers/internals";

interface DatePickerDebounceProps extends Omit<DatePickerProps, "onChange"> {
  onChange: (d?: PickerValue) => void;
}

export default function DatePickerDebounce({
  onChange,
  value,
  ...props
}: DatePickerDebounceProps) {
  const [valueCurrent, setValueCurrent] = useState(value);

  const debouncedValue = useDebounce(valueCurrent, 100);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <DatePicker
      {...props}
      onChange={(value) => setValueCurrent(value)}
      value={valueCurrent}
    />
  );
}
