import { Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useStore } from "../../context";
import { fetchForcast } from "../../../../utils/fetchForcast";

export const UserPosition = () => {
	const [loading, setLoading] = useState(false);
	const [, setStore] = useStore((store) => store.userPosition);
	const clickHandler = () => {
		setLoading(true);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					fetchForcast('', latitude, longitude).then(response => {
						const city = response.data.location.name.toLowerCase();
						const userCities = new Set(
							JSON.parse(localStorage.getItem('userCities') || '[]')
						);
						if (userCities.size >= 3) {
							const firstValue = userCities.values().next().value;
							userCities.delete(firstValue);
						}
						userCities.add(city);
						localStorage.setItem(
							'userCities',
							JSON.stringify([...userCities])
						);
						setStore({
							city: city
						});
						setLoading(false);
					});
				},
				function(error) {
					switch (error.code) {
						case error.PERMISSION_DENIED:
							console.log(error);

							console.log('The user has rejected the location request.');
							break;
						case error.POSITION_UNAVAILABLE:
							console.log('Location information is not available.');
							break;
						case error.TIMEOUT:
							console.log('Request timed out.');
							break;
						default:
							console.log('An unknown error occurred.');
							break;
					}
					setLoading(false);
				}
			);
		} else {
			console.log('Geolocation is not supported by your browser.');
		}
	};

	return (
		<Box sx={{ m: 1, position: 'relative' }}>
			{loading && (
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
			)}
			<Button onClick={clickHandler} variant="contained">
				Get your geoposition
			</Button>
		</Box>
	);
};
