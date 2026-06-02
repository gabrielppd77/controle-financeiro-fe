import {
  DatePicker as MUIDatePicker,
  type DatePickerProps as MUIDatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import { formatDate, formatToDayjs } from "@utils";
import { Controller, useFormContext } from "react-hook-form";

const SLOT_PROPS_BASE = {
  size: "small" as const,
  fullWidth: true,
};

export interface DatePickerProps extends Omit<
  MUIDatePickerProps,
  "label" | "name"
> {
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
        slotProps={{
          textField: {
            ...SLOT_PROPS_BASE,
            required,
          },
        }}
        name={name}
        format="DD/MM/YYYY"
        {...rest}
      />
    );
  }

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <MUIDatePicker
          slotProps={{
            textField: {
              ...SLOT_PROPS_BASE,
              helperText: fieldState.error ? fieldState.error.message : null,
              error: !!fieldState.error,
              required,
            },
          }}
          onChange={(newValue) => field.onChange(formatDate(newValue))}
          value={formatToDayjs(field.value)}
          name={name}
          format="DD/MM/YYYY"
          {...rest}
        />
      )}
    />
  );
}
