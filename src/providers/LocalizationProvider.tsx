import { LocalizationProvider as LocalizationProviderLib } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";

interface LocalizationProviderProps {
  children: React.ReactNode;
}

export default function LocalizationProvider({
  children,
}: LocalizationProviderProps) {
  return (
    <LocalizationProviderLib dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      {children}
    </LocalizationProviderLib>
  );
}
