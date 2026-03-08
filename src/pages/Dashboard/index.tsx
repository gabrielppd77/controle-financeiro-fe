import { Box, Paper, Stack, Typography } from "@mui/material";

import PageContainer from "../../components/PageContainer";

import ChartPie from "./components/ChartPie";
import ChartDonuts from "./components/ChartDonuts";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs from "dayjs";
import type { PickerValue } from "@mui/x-date-pickers/internals";

export default function Dashboard() {
  const pageTitle = "Painel";

  const [dateYearMonth, setDateYearMonth] = useState<PickerValue>(
    dayjs().locale("pt-br"),
  );

  return (
    <PageContainer title={pageTitle}>
      <Typography sx={{ mb: 1 }}>Bem vindo!</Typography>

      <Stack gap={1}>
        <Stack gap={1} direction={{ sm: "column", md: "row" }}>
          <Stack component={Paper} padding={2} gap={1}>
            <StaticDatePicker
              views={["year", "month"]}
              onChange={setDateYearMonth}
              value={dateYearMonth}
              slots={{
                actionBar: () => <div />,
                toolbar: () => <div />,
              }}
              sx={{
                "& .MuiDateCalendar-root": {
                  height: "auto",
                },
              }}
              openTo="month"
            />
          </Stack>
          <Box sx={{ flex: 1 }}>
            <ChartDonuts />
          </Box>
        </Stack>

        <ChartPie />
      </Stack>
    </PageContainer>
  );
}
