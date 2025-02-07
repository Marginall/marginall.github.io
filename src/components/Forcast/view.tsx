import { Box, CircularProgress, Container, Grid2, Typography } from "@mui/material";
import { Provider } from "./context";
import React from "react";
import { useForcast } from "./hooks/useForcast";
import { DEFAULT_CITY } from "../../constants";
import { Cities } from "./components/Cities";
import { List } from "./components/List";
import { Info } from "./components/Info";
import { SearchForm } from "./components/SearchForm";
import { UserPosition } from "./components/UserPosition";
import { ToggleTheme } from "../ToggleTheme";

export const Forcast: React.FC = () => {
	const { forcast, isLoading, isError } = useForcast(DEFAULT_CITY);

	return forcast ? (
		<Provider
			initialState={{
				userPosition: {
					latitude: null,
					longitude: null
				},
				city: DEFAULT_CITY
			}}
		>
			<MainView />
		</Provider>
	) : isLoading ? (
		<CircularProgress
			color="secondary"
			sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				marginTop: '-20px',
				marginLeft: '-12px',
				transform: 'translate(-50%, -50%)',
				zIndex: 2
			}}
		/>
	) : isError ? (
		<Typography component={'h2'} variant="h4" fontWeight={400}>
			Server Error
		</Typography>
	) : null;
}

const MainView = () => {
	return (
		<>
			<ToggleTheme />
			<Box display="flex" justifyContent="center">
				<Container>
					<Box
						display="flex"
						justifyContent={{ sm: 'space-between' }}
						alignItems="start"
						flexGrow={1}
						flexDirection={{ xs: 'column', sm: 'row' }}
					>
						<Box display="flex" justifyContent="center" py={{ xs: 3, sm: 7 }}>
							<Info />
						</Box>
						<Grid2
							container
							py={{ xs: 3, sm: 7 }}
							display="flex"
							flexDirection={{ xs: 'column' }}
							alignItems="end"
							spacing={2}
							sx={{ width: { xs: '100%', sm: 'auto' } }}
						>
							<Grid2>
								<SearchForm />
							</Grid2>
							<Grid2>
								<UserPosition />
							</Grid2>
						</Grid2>
					</Box>
				</Container>
			</Box>
			<Box display="flex" justifyContent="center">
				<Container>
					<Cities />
				</Container>
			</Box>
			<Box display="flex" justifyContent="center">
				<Container>
					<List />
				</Container>
			</Box>
		</>
	);
};
