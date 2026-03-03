import {
  TextField as MUITextField,
  type TextFieldProps as MUITextFieldProps,
} from "@mui/material";
import { Controller } from "react-hook-form";

import { NumericFormat, type NumericFormatProps } from "react-number-format";

function CurrencyTextFieldDefault(
  props: NumericFormatProps<MUITextFieldProps>,
) {
  return (
    <NumericFormat
      customInput={MUITextField}
      allowNegative={false}
      allowLeadingZeros
      thousandSeparator="."
      decimalSeparator=","
      {...props}
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
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <CurrencyTextFieldDefault
          helperText={error ? error.message : null}
          error={!!error}
          onValueChange={({ floatValue }) => onChange(floatValue)}
          value={value}
          name={name}
          {...rest}
        />
      )}
    />
  );
}
