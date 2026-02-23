import QueryClientProvider from "@providers/QueryClientProvider";
import ThemeProvider from "@providers/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import RouterProvider from "@providers/RouterProvider";
import ToastProvider from "@providers/ToastProvider";

export default function App() {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <ToastProvider>
          <CssBaseline />
          <RouterProvider />
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
