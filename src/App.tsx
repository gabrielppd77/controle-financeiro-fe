import ThemeProvider from "./providers/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import RouterProvider from "./providers/RouterProvider";

export default function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <RouterProvider />
    </ThemeProvider>
  );
}
