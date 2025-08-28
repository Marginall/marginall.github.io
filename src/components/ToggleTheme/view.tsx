import { Box, Switch, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useActions } from "../../hooks/useActions";

export const ToggleTheme = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const { toggleTheme } = useActions();

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
      <Switch checked={theme === "light"} onClick={() => toggleTheme()} />
    </Box>
  );
};
