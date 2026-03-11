import { useState } from "react";
import TextField, { type TextFieldProps } from "./TextField";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type TextFieldPasswordProps = TextFieldProps;

export default function TextFieldPassword({
  ...props
}: TextFieldPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      type={showPassword ? "text" : "password"}
      placeholder="••••••"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
}
