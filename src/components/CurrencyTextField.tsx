import {
  TextField as MUITextField,
  type TextFieldProps as MUITextFieldProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import { NumericFormat, type NumericFormatProps } from "react-number-format";

function CurrencyTextFieldDefault(
  props: NumericFormatProps<MUITextFieldProps>,
) {
  return (
    <NumericFormat
      {...props}
      customInput={MUITextField}
      allowNegative={false}
      allowLeadingZeros
      thousandSeparator="."
      decimalSeparator=","
    />
  );
}

interface CurrencyTextFieldProps extends Omit<
  NumericFormatProps<MUITextFieldProps>,
  "label" | "name"
> {
  label: string;
  name: string;
}

export default function CurrencyTextField({
  name,
  ...rest
}: CurrencyTextFieldProps) {
  const form = useFormContext();

  if (!form) {
    return <CurrencyTextFieldDefault {...rest} name={name} />;
  }

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <CurrencyTextFieldDefault
          {...rest}
          helperText={fieldState.error ? fieldState.error.message : null}
          error={!!fieldState.error}
          onValueChange={({ floatValue }) => field.onChange(floatValue)}
          value={field.value}
          name={name}
        />
      )}
    />
  );
}
