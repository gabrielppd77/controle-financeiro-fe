import {
  ThemeProvider as ThemeProviderLib,
  createTheme,
} from "@mui/material/styles";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;

  const theme = createTheme({});

  return <ThemeProviderLib theme={theme}>{children}</ThemeProviderLib>;
}
