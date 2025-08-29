import { Box, Switch, Typography } from "@mui/material";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";

export const ToggleTheme = () => {
  const { mode } = useAppSelector((state) => state.theme);
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
      <Switch checked={mode === "light"} onClick={() => toggleTheme()} />
    </Box>
  );
};
