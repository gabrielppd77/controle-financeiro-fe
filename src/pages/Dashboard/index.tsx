import { Box, Paper, Stack, Typography } from "@mui/material";

import PageContainer from "../../components/PageContainer";

import ChartPie from "./components/ChartPie";
import ChartDonuts from "./components/ChartDonuts";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs from "dayjs";
import type { PickerValue } from "@mui/x-date-pickers/internals";

import useDashboards from "./data/useDashboards";
import FetchingLoading from "@components/FetchingLoading";

export default function Dashboard() {
  const pageTitle = "Painel";

  const todayLocaleDate = dayjs().locale("pt-br");

  const [dateYearMonth, setDateYearMonth] =
    useState<PickerValue>(todayLocaleDate);

  const {
    data,
    isLoading: _isLoading,
    isFetching,
  } = useDashboards({
    date: dateYearMonth?.toISOString() || todayLocaleDate.toISOString(),
  });

  const isLoading = _isLoading || isFetching;

  return (
    <PageContainer title={pageTitle}>
      <Typography sx={{ mb: 1 }}>Bem vindo!</Typography>

      <FetchingLoading loading={isLoading} />

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
            <ChartDonuts data={data?.classifications || []} />
          </Box>
        </Stack>

        <ChartPie data={data?.types || []} />
      </Stack>
    </PageContainer>
  );
}
