import { Box } from "@mui/material";

interface BoxColorProps {
  color: string | null;
  fine?: boolean;
}

export default function BoxColor({ color, fine }: BoxColorProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Box
        sx={{
          width: fine ? 8 : 20,
          height: 20,
          backgroundColor: color,
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </Box>
  );
}
