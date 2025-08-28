import { Box, Button, CircularProgress } from "@mui/material";
import { useLazyGetWeatherByGeoQuery } from "../../../../services/weatherApi";
import { useEffect } from "react";
import { useActions } from "../../../../hooks/useActions";

export const UserPosition = () => {
  const { setCity } = useActions();
  const [getWeatherByGeo, { data, error, isLoading }] =
    useLazyGetWeatherByGeoQuery();

  useEffect(() => {
    if (data) {
      setCity(data.data.location.name);
    }
  }, [data, setCity]);

  const clickHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          getWeatherByGeo({ lat: latitude, lon: longitude });
        },
        function (error) {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log(error);

              console.log("The user has rejected the location request.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.log("Location information is not available.");
              break;
            case error.TIMEOUT:
              console.log("Request timed out.");
              break;
            default:
              console.log("An unknown error occurred.");
              break;
          }
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  };

  if (error) {
    console.log("Error fetching weather data:", error);
  }

  return (
    <Box sx={{ mb: { xs: 2, md: 0 }, position: "relative" }}>
      {isLoading && (
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
      )}
      <Button onClick={clickHandler} variant="contained">
        Get your geoposition
      </Button>
    </Box>
  );
};
