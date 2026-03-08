import { PieChart } from "@mui/x-charts/PieChart";

import { Paper, Stack, Typography } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { formatMoney } from "@utils";

export default function ChartDonuts() {
  const dataClassification = [
    { value: 4268.64, label: "Receita" },
    { value: 3790.29, label: "Despesa" },
  ];

  return (
    <Stack component={Paper} padding={2} gap={1}>
      <Typography sx={{ textAlign: "center" }}>
        Resultado do mês por <strong>Classificação</strong>
      </Typography>

      <Stack gap={4}>
        <PieChart
          series={[
            {
              data: dataClassification,
              arcLabel: "label",
              arcLabelMinAngle: 35,
              innerRadius: 40,
            },
          ]}
          height={250}
          width={250}
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
              {dataClassification.map((row) => (
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
