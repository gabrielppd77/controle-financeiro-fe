import {
  ThemeProvider as ThemeProviderLib,
  createTheme,
} from "@mui/material/styles";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;

  const theme = createTheme({
    components: {
      MuiButton: {
        defaultProps: {
          variant: "contained",
          size: "small",
          style: { textTransform: "none" },
        },
      },
      MuiFab: {
        defaultProps: {
          style: { textTransform: "none" },
        },
      },
      MuiSvgIcon: {
        defaultProps: {
          fontSize: "small",
        },
      },
      MuiIcon: {
        defaultProps: {
          fontSize: "small",
        },
      },
      MuiIconButton: {
        defaultProps: {
          size: "small",
        },
      },
      MuiTextField: {
        defaultProps: {
          size: "small",
          fullWidth: true,
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
        },
      },
      // MuiTableCell: {
      //   styleOverrides: {
      //     root: {
      //       padding: 8,
      //     },
      //   },
      // },
    },
  });

  return <ThemeProviderLib theme={theme}>{children}</ThemeProviderLib>;
}
