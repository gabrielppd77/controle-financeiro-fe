import QueryClientProvider from "@providers/QueryClientProvider";
import ThemeProvider from "@providers/ThemeProvider";
import LocalizationProvider from "@providers/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import RouterProvider from "@providers/RouterProvider";
import ToastProvider from "@providers/ToastProvider";
import AuthProvider from "@providers/AuthProvider";

export default function App() {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <LocalizationProvider>
          <ToastProvider>
            <CssBaseline />
            <AuthProvider>
              <RouterProvider />
            </AuthProvider>
          </ToastProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
