import { PieChart } from "@mui/x-charts/PieChart";

import { Paper, Stack, Typography } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { formatMoney } from "@utils";
import type { GetStatisticMonthItemResponse } from "../data/dtos/GetStatisticMonthItemResponse";

interface ChartDonutsProps {
  data: GetStatisticMonthItemResponse[];
}

export default function ChartDonuts({ data }: ChartDonutsProps) {
  return (
    <Stack component={Paper} padding={2} gap={1}>
      <Typography sx={{ textAlign: "center" }}>
        Resultado do mês por <strong>Classificação</strong>
      </Typography>

      <Stack gap={4}>
        <PieChart
          series={[
            {
              data: data,
              arcLabel: "label",
              arcLabelMinAngle: 35,
              innerRadius: 40,
            },
          ]}
          height={250}
          width={250}
          localeText={{
            noData: "Nenhuma informação para ser exibida",
          }}
          hideLegend
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
