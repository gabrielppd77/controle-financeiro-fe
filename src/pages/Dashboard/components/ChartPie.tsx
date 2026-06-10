import { PieChart } from "@mui/x-charts/PieChart";

import { Paper, Stack, Typography } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { formatMoney } from "@utils";

import type { GetStatisticMonthItemResponse } from "../data/dtos/GetStatisticMonthItemResponse";

interface ChartPieProps {
  data: GetStatisticMonthItemResponse[];
  title: string;
  innerRadius?: number;
}

export default function ChartPie({ data, title, innerRadius }: ChartPieProps) {
  return (
    <Stack component={Paper} padding={2} gap={1}>
      <Typography sx={{ textAlign: "center" }}>
        Resultado do mês por <strong>{title}</strong>
      </Typography>

      <Stack gap={4} direction={{ sm: "column", md: "row" }}>
        <PieChart
          series={[
            {
              data: data.map((d) => ({ ...d, color: d.color || undefined })),
              arcLabel: "label",
              arcLabelMinAngle: 35,
              innerRadius,
            },
          ]}
          hideLegend
          height={300}
          width={300}
          localeText={{
            noData: "Nenhuma informação para ser exibida",
          }}
          slotProps={{
            pieArcLabel: {
              style: {
                fill: "#fff",
              },
            },
          }}
        />

        <TableContainer>
          <Table aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>{title}</TableCell>
                <TableCell align="right">Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.label}
                  </TableCell>
                  <TableCell align="right">{formatMoney(row.value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
}
