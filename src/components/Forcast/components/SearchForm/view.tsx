import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Icon, Stack, useTheme } from "@mui/material";
import { API_KEY } from "../../../../constants";
import { useDispatch } from "react-redux";
import { setCity } from "../../../../slices/citySlice";
import { addCity } from "../../../../slices/citiesSlice";

export const SearchForm: React.FC = () => {
  const [options, setOptions] = useState<
    { label: string; id: string; key: number }[]
  >([]);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("search")?.toString();
    if (query) {
      dispatch(setCity(query));
      dispatch(addCity(query));
    }
  };

  const fetchOptions = async (query: string) => {
    if (query.length > 2) {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
      );
      setOptions(
        response.data.map((item: { name: string; id: number }) => {
          return { label: item.name, id: item.id, key: item.id };
        })
      );
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: theme.palette.background.default,
        borderRadius: 1,
      }}
    >
      <Stack direction="row" spacing={2}>
        <Autocomplete
          disablePortal
          options={options}
          onInputChange={(_, value) => fetchOptions(value)}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {option.label}
            </li>
          )}
          sx={{ width: { xs: 250, sm: 300 } }}
          renderInput={(params) => (
            <TextField {...params} name="search" label="Search" />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          // disabled={isLoading}
        >
          <Icon component={SearchIcon} color="action" />
        </Button>
      </Stack>
    </Box>
  );
};
