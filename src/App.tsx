import QueryClientProvider from "@providers/QueryClientProvider";
import ThemeProvider from "@providers/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import RouterProvider from "@providers/RouterProvider";

export default function App() {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <CssBaseline />
        <RouterProvider />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
