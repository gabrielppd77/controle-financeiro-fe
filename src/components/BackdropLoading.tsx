import React, { useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

interface BackdropLoadingProps {
  loading: boolean;
}

//is not in use
export default function BackdropLoading({ loading }: BackdropLoadingProps) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(loading);
  }, [loading]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
