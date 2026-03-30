import {
  TextField as MUITextField,
  type TextFieldProps as MUITextFieldProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export interface TextFieldProps extends Omit<
  MUITextFieldProps,
  "label" | "name"
> {
  label: string;
  name: string;
}

export default function TextField({ name, type, ...rest }: TextFieldProps) {
  const form = useFormContext();

  if (!form) {
    return <MUITextField {...rest} name={name} type={type} />;
  }

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <MUITextField
          {...rest}
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
        />
      )}
    />
  );
}
