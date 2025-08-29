import { Chip, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useActions } from "../../../../hooks/useActions";
import { useAppSelector } from "../../../../hooks/useAppSelector";

export const Cities = () => {
  const cities = useAppSelector((state) => state.cities.names);
  const { cityName: currentCity } = useAppSelector((state) => state.city);
  const { setCity, deleteCity } = useActions();

  const clickHandler = (city: string) => {
    setCity(city);
  };

  const deleteHandler = (city: string) => {
    deleteCity(city);
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
