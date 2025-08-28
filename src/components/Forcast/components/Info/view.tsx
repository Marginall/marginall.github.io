import { Box, Typography } from "@mui/material";
import { useGetWeatherByCityQuery } from "../../../../services/weatherApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

export const Info = () => {
  const city = useSelector((state: RootState) => state.city);
  const { data: forcast } = useGetWeatherByCityQuery(city.cityName);

  return forcast ? (
    <Box
      display="flex"
      flexWrap="wrap"
      flexDirection={{ xs: "row", sm: "column" }}
    >
      <Box display="flex" alignItems="center" px={1}>
        <Typography component={"div"} variant="body2" fontWeight={600} mr={1}>
          Location:
        </Typography>
        <Typography component={"div"} variant="body2" fontWeight={400}>
          {forcast.data?.location?.name}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" px={1}>
        <Typography component={"div"} variant="body2" fontWeight={600} mr={1}>
          Region:
        </Typography>
        <Typography component={"div"} variant="body2" fontWeight={400}>
          {forcast.data?.location.region}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" px={1}>
        <Typography component={"div"} variant="body2" fontWeight={600} mr={1}>
          Country:
        </Typography>
        <Typography component={"div"} variant="body2" fontWeight={400}>
          {forcast.data?.location.country}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" px={1}>
        <Typography component={"div"} variant="body2" fontWeight={600} mr={1}>
          Temperature:
        </Typography>
        <Typography component={"div"} variant="body2" fontWeight={400}>
          {forcast.data?.temp}°C
        </Typography>
      </Box>
    </Box>
  ) : null;
};
