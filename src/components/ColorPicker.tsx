import { useState } from "react";
import {
  TextField as MUITextField,
  type TextFieldProps as MUITextFieldProps,
  InputAdornment,
  IconButton,
  Popover,
  Box,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import { SketchPicker } from "react-color";

import { Controller, useFormContext } from "react-hook-form";

export interface ColorPickerProps extends Omit<
  MUITextFieldProps,
  "label" | "name"
> {
  label: string;
  name: string;
}

export default function ColorPicker({ name, ...rest }: ColorPickerProps) {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  const form = useFormContext();

  if (!form) {
    return <MUITextField {...rest} name={name} />;
  }

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <div>
          <MUITextField
            {...rest}
            helperText={fieldState.error ? fieldState.error.message : null}
            error={!!fieldState.error}
            onChange={(e) => field.onChange(e.target.value)}
            value={field.value || ""}
            name={name}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: field.value,
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleOpen}>
                      <PaletteIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <SketchPicker
              color={field.value || ""}
              onChangeComplete={(c) => field.onChange(c.hex)}
            />
          </Popover>
        </div>
      )}
    />
  );
}
