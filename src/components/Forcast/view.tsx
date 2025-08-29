import {
  Box,
  CircularProgress,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import React from "react";
import { List } from "./components/List";
import { Info } from "./components/Info";
import { SearchForm } from "./components/SearchForm";
import { ToggleTheme } from "../ToggleTheme";
import { useGetWeatherByCityQuery } from "../../services/weatherApi";
import { Cities } from "./components/Cities";
import { UserPosition } from "./components/UserPosition";
import { useAppSelector } from "../../hooks/useAppSelector";

export const Forcast: React.FC = () => {
  const { cityName } = useAppSelector((state) => state.city);
  const { data, error, isLoading } = useGetWeatherByCityQuery(cityName);

  return data ? (
    <MainView />
  ) : isLoading ? (
    <CircularProgress
      color="secondary"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-20px",
        marginLeft: "-12px",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
      }}
    />
  ) : error ? (
    <Typography component={"h2"} variant="h4" fontWeight={400}>
      Server Error
    </Typography>
  ) : null;
};

const MainView = () => {
  return (
    <>
      <ToggleTheme />
      <Box display="flex" justifyContent="center">
        <Container>
          <Box
            display="flex"
            justifyContent={{ sm: "space-between" }}
            alignItems="start"
            flexGrow={1}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Box display="flex" justifyContent="center" py={{ xs: 3, sm: 7 }}>
              <Info />
            </Box>
            <Grid2
              container
              py={{ xs: 3, sm: 7 }}
              display="flex"
              flexDirection={{ xs: "column" }}
              alignItems="end"
              spacing={3}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <Grid2>
                <SearchForm />
              </Grid2>
              <Grid2>
                <UserPosition />
              </Grid2>
            </Grid2>
          </Box>
        </Container>
      </Box>
      <Box display="flex" justifyContent="center">
        <Container>
          <Cities />
        </Container>
      </Box>
      <Box display="flex" justifyContent="center">
        <Container>
          <List />
        </Container>
      </Box>
    </>
  );
};
