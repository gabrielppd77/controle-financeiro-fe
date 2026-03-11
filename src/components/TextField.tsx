import {
  TextField as MUITextField,
  type TextFieldProps as MUITextFieldProps,
} from "@mui/material";
import { Controller } from "react-hook-form";

export interface TextFieldProps extends Omit<
  MUITextFieldProps,
  "label" | "name"
> {
  label: string;
  name: string;
}

export default function TextField({ name, type, ...rest }: TextFieldProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <MUITextField
          helperText={fieldState.error ? fieldState.error.message : null}
          error={!!fieldState.error}
          onChange={(e) => {
            const v =
              type === "number"
                ? parseInt(e.target.value || "0")
                : e.target.value;
            field.onChange(v);
          }}
          value={field.value || ""}
          name={name}
          type={type}
          {...rest}
        />
      )}
    />
  );
}
