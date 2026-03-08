import { CircularProgress } from "@mui/material";

interface FetchingLoadingProps {
  loading: boolean;
}

export default function FetchingLoading({ loading }: FetchingLoadingProps) {
  return (
    <CircularProgress
      sx={{
        display: loading ? "block" : "none",
        position: "absolute",
        right: 40,
        top: 80,
        zIndex: 9999,
      }}
      size={30}
    />
  );
}
