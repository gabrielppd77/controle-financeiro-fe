import { Paper, Stack, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

import type { ChartDataOfYearDto } from "../data/dtos/ChartDataOfYearDto";

interface ChartBarProps {
  data: ChartDataOfYearDto[];
}

export default function ChartBar({ data }: ChartBarProps) {
  const months = [...new Set(data.map((x) => x.month))];

  const labels = [...new Set(data.map((x) => x.label))];

  const series = labels.map((label) => ({
    label,
    data: months.map((month) => {
      const found = data.find((x) => x.month === month && x.label === label);

      return found?.value ?? 0;
    }),
  }));

  return (
    <Stack component={Paper} padding={2} gap={1}>
      <Typography sx={{ textAlign: "center" }}>
        Resultado do ano por <strong>Classificação</strong>
      </Typography>
      <BarChart
        width={700}
        height={400}
        xAxis={[
          {
            scaleType: "band",
            data: months,
          },
        ]}
        series={series}
        localeText={{
          noData: "Nenhuma informação para ser exibida",
        }}
      />
    </Stack>
  );
}
