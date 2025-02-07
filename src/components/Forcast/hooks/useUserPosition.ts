import { useEffect, useState } from "react";

export const useUserPosition = () => {
	const [latLng, setLatLng] = useState<{
		latitude: number | null;
		longitude: number | null;
	}>({
		latitude: null,
		longitude: null
	});
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					setLatLng({
						latitude,
						longitude
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
				}
			);
		} else {
			console.log('Geolocation is not supported by your browser.');
		}
	}, []);

	return latLng;
};
