import { Forcast } from "./components/Forcast";
import { BrowserRouter, Routes, Route } from "react-router";
import { themeLight } from "./theme/theme-light";
import { themeDark } from "./theme/theme-dark";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useAppSelector } from "./hooks/useAppSelector";

const App = () => {
  const { mode } = useAppSelector((state) => state.theme);
  return (
    <MuiThemeProvider theme={mode === "light" ? themeLight : themeDark}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Forcast />} />
          <Route
            path="images"
            element={<div>We will do it as soon as possible...</div>}
          />
        </Routes>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
