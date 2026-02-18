import { Typography } from "@mui/material";
import PageContainer from "../../components/PageContainer";

export default function Dashboard() {
  const pageTitle = "Painel";

  return (
    <PageContainer title={pageTitle}>
      <Typography>Bem vindo!</Typography>
    </PageContainer>
  );
}
