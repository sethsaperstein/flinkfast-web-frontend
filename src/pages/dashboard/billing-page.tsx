import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { PageLayout } from "../../components/page-layout";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  Spend,
  JobCount,
  ProcessingUnits,
} from "../../components/dashboard/billing";
import { Jobs } from "../../components/dashboard/jobs";
import { SideNav } from "../../components/navigation/side-nav";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { BillingSummary } from "src/models/billing-summary";
import { getBillingSummary as getBilling } from "src/services/flinkfast.service";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";

export const BillingPage: React.FC = () => {
    const [billingSummary, setBillingSummary] = useState<BillingSummary | undefined>(undefined);

  const { getAccessTokenSilently } = useAuth0();
  const theme = useTheme();

  useEffect(() => {
    let isMounted = true;

    const getBillingSummary = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getBilling(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setBillingSummary(data);
      }
      if (error) {
        console.log(error.message);
      }
    };

    getBillingSummary();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  return (
    <PageLayout>
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100%",
          }}
        >
          <AppBar
            position="static"
            sx={{ backgroundColor: "white", color: "black" }}
          >
            <Toolbar>
              <Typography variant="h4" component="div">
                Billing
              </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} margin={0}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    height: 30,
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" component="div">
                    Summary
                  </Typography>
                </Paper>
              </Grid>
              <Grid container spacing={1} margin={0}>
                <Grid item xs={12} md={4} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 200,
                      gap: "10px",
                    }}
                  >
                    {billingSummary !== undefined ? (
                      <Spend forecast={billingSummary.monthlyForecast} />
                    ) : (
                      <CircularProgress />
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 200,
                      gap: "10px",
                    }}
                  >
                    {billingSummary !== undefined ? (
                      <JobCount count={billingSummary.runningJobs} />
                    ) : (
                      <CircularProgress />
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 200,
                      gap: "10px",
                    }}
                  >
                    {billingSummary !== undefined ? (
                      <ProcessingUnits units={billingSummary.monthlyProcessingUnitHours} />
                    ) : (
                      <CircularProgress /> // Show loading icon while data is being fetched
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </PageLayout>
  );
};
