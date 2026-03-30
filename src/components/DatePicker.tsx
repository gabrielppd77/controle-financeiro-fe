import {
  DatePicker as MUIDatePicker,
  type DatePickerProps as MUIDatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext } from "react-hook-form";
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
  const form = useFormContext();

  if (!form) {
    return (
      <MUIDatePicker
        {...rest}
        slotProps={{
          textField: {
            size: "small",
            required,
            fullWidth: true,
          },
        }}
        name={name}
        format="DD/MM/YYYY"
      />
    );
  }

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <MUIDatePicker
          {...rest}
          slotProps={{
            textField: {
              helperText: fieldState.error ? fieldState.error.message : null,
              error: !!fieldState.error,
              size: "small",
              required,
              fullWidth: true,
            },
          }}
          onChange={(newValue) => {
            field.onChange(newValue ? newValue.toISOString() : null);
          }}
          value={field.value ? dayjs(field.value) : null}
          name={name}
          format="DD/MM/YYYY"
        />
      )}
    />
  );
}
