import { Box, Switch, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toggleTheme } from "../../slices/themeSlice";

export const ToggleTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <Box
      display="flex"
      justifyContent="end"
      alignItems="center"
      sx={{ height: "20px" }}
      pr={3}
      pt={3}
    >
      <Typography component={"div"} variant="body2" fontWeight={500}>
        theme
      </Typography>
      <Switch
        checked={theme === "light"}
        onClick={() => dispatch(toggleTheme())}
      />
    </Box>
  );
};
