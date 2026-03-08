import { PieChart } from "@mui/x-charts/PieChart";

import { Paper, Stack, Typography } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { formatMoney } from "@utils";

export default function ChartPie() {
  const dataType = [
    { value: 4268.64, label: "Salário" },
    { value: 995.27, label: "Lazer" },
    { value: 887.9, label: "Saúde" },
    { value: 532.98, label: "Transporte" },
    { value: 472.53, label: "Necessidades básicas" },
    { value: 411.8, label: "Casa" },
    { value: 150, label: "?" },
    { value: 128.03, label: "Presente" },
    { value: 99.51, label: "Supermercado" },
    { value: 61, label: "Alimentação (Gastos extras)" },
    { value: 51.27, label: "Assinaturas" },
  ];

  return (
    <Stack component={Paper} padding={2} gap={1}>
      <Typography sx={{ textAlign: "center" }}>
        Resultado do mês por <strong>Tipo</strong>
      </Typography>

      <Stack gap={4} direction={{ sm: "column", md: "row" }}>
        <PieChart
          series={[
            {
              data: dataType,
              arcLabel: "label",
              arcLabelMinAngle: 35,
            },
          ]}
          hideLegend
          height={300}
          width={300}
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
                <TableCell>Tipo</TableCell>
                <TableCell align="right">Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataType.map((row) => (
                <TableRow
                  key={row.label}
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
