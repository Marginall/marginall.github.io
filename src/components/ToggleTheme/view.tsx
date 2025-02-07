import { Box, Switch, Typography } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../theme/context";

export const ToggleTheme = () => {
	const { toggleTheme, mode } = useContext(ThemeContext);

	return (
		<Box
			display="flex"
			justifyContent="end"
			alignItems="center"
			sx={{ height: '20px' }}
			pr={3}
			pt={3}
		>
			<Typography component={'div'} variant="body2" fontWeight={500}>
				theme
			</Typography>
			<Switch checked={mode === 'light'} onChange={toggleTheme} />
		</Box>
	);
};
