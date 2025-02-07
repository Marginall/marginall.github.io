import { Box, Collapse, Divider, Grid2, Typography, useTheme } from "@mui/material";
import { Fragment, useId, useState } from "react";
import { format } from "date-fns";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import { ForecastdayType } from "../../../../types";
import { useForcast } from "../../hooks/useForcast";
import { useStore } from "../../context";
import { Day } from "../Day";

export const List = () => {
	const theme = useTheme();
	const [showDetails, setShowDetails] = useState({
		id: '',
		show: false
	});
	const [city] = useStore((store) => store.city);
	const { forcast } = useForcast(city);
	const id = useId();

	return forcast ? (
		<>
			<Grid2 container alignItems="stretch" spacing={{ xs: 2, sm: 3 }} mb={5}>
				{forcast.data.forecastday.map((day: ForecastdayType, index: number) => (
					<Grid2 key={`${id}-${index}`} size={{ xs: 4, sm: 4, md: 3 }}>
						<Day record={day} setShowDetails={setShowDetails} />
					</Grid2>
				))}
			</Grid2>
			{forcast.data.forecastday.map((day: ForecastdayType, index: number) => (
				<Collapse
					key={`${id}-${index}`}
					in={showDetails.id === day.id && showDetails.show}
				>
					<Box
						p={3}
						borderRadius={1}
						sx={{
							border: `1px solid ${theme.palette.divider}`,
							backgroundColor: theme.palette.background.paper
						}}
					>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							mb={3}
						>
							<Typography component={'h2'} variant="h4" fontWeight={400}>
								{day.date}
							</Typography>
							<Typography component={'div'} variant="h5" fontWeight={400}>
								{day.location}
							</Typography>
						</Box>
						<Box
							display="flex"
							justifyContent="space-between"
							flexDirection="column"
						>
							{day.hours.map((hour, index) => (
								<Fragment key={index}>
									<Grid2 container spacing={3} py={2} px={1}>
										<Grid2
											size={2}
											display="flex"
											justifyContent="start"
											alignItems="center"
										>
											<Typography
												component={'div'}
												variant="body2"
												fontWeight={400}
											>
												{format(new Date(hour.time), 'hh:mm a')}
											</Typography>
										</Grid2>
										<Grid2
											size={3}
											display="flex"
											justifyContent="center"
											alignItems="center"
										>
											<img
												src={hour.condition.icon}
												alt={hour.condition.text}
												width={24}
												height={24}
												loading="lazy"
											/>
										</Grid2>
										<Grid2
											size={2}
											display="flex"
											justifyContent="center"
											alignItems="center"
										>
											<ThermostatIcon />
											<Typography
												component={'div'}
												variant="body2"
												fontWeight={400}
											>
												{hour.temp}
												&deg;
											</Typography>
										</Grid2>
										<Grid2
											size={2}
											display="flex"
											justifyContent="center"
											alignItems="center"
										>
											<AirIcon />
											<Typography
												component={'div'}
												variant="body2"
												fontWeight={400}
												ml={1}
											>
												{hour.wind} km/h
											</Typography>
										</Grid2>
										<Grid2
											size={{
												xs: 3
											}}
											display="flex"
											justifyContent="center"
											alignItems="center"
										>
											<Typography
												component={'div'}
												variant="body1"
												fontWeight={400}
											>
												{hour.condition.text}
											</Typography>
										</Grid2>
									</Grid2>
									<Divider />
								</Fragment>
							))}
						</Box>
					</Box>
				</Collapse>
			))}
		</>
	) : null;
};
