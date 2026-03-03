import {
  DatePicker as MUIDatePicker,
  type DatePickerProps as MUIDatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

interface DatePickerProps extends Omit<MUIDatePickerProps, "label" | "name"> {
  label: string;
  name: string;
  required?: boolean;
}

export default function DatePicker({
  name,
  required,
  ...rest
}: DatePickerProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <MUIDatePicker
          slotProps={{
            textField: {
              helperText: fieldState.error ? fieldState.error.message : null,
              error: !!fieldState.error,
              size: "small",
              required,
            },
          }}
          onChange={(newValue) => {
            field.onChange(newValue ? newValue.format("YYYY-MM-DD") : null);
          }}
          value={field.value ? dayjs(field.value) : null}
          name={name}
          format="DD/MM/YYYY"
          {...rest}
        />
      )}
    />
  );
}
