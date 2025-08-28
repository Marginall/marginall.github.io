import { Chip, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { setCity } from "../../../../slices/citySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCity } from "../../../../slices/citiesSlice";

export const Cities = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state: RootState) => state.cities.names);
  const currentCity = useSelector((state: RootState) => state.city.cityName);

  const clickHandler = (city: string) => {
    dispatch(setCity(city));
  };

  const deleteHandler = (city: string) => {
    dispatch(deleteCity(city));
  };

  return cities.length > 1 ? (
    <Stack direction="row" spacing={3} mb={4}>
      {cities.map((city, index) => (
        <Chip
          key={index}
          label={city}
          color="info"
          onClick={() => clickHandler(city)}
          onDelete={
            city !== currentCity ? () => deleteHandler(city) : undefined
          }
          variant={city === currentCity ? "filled" : "outlined"}
          disabled={city === currentCity}
          deleteIcon={<DeleteIcon />}
        />
      ))}
    </Stack>
  ) : null;
};
