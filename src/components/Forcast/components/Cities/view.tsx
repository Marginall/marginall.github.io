import { Chip, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useStore } from "../../context";

export const Cities = () => {
	const [userCities, setUserCities] = useState<Set<string>>(new Set());
	const [city, setCity] = useState<string | null>(null);
	const [store, setStore] = useStore((store) => store.city);

	useEffect(() => {
		const storedCities = new Set<string>(
			JSON.parse(localStorage.getItem('userCities') || '[]')
		);
		setUserCities(storedCities);
	}, [store]);

	const clickHandler = (city: string) => {
		setCity(city);
		setStore({
			city: city
		});
	};

	return userCities.size > 0 ? (
		<Stack direction="row" spacing={3} mb={4}>
			{Array.from(userCities).map((item, index) => (
				<Chip
					key={index}
					label={(item as string).toString()}
					color="info"
					onClick={() => clickHandler((item as string).toString())}
					variant={city === item ? 'filled' : 'outlined'}
					disabled={city === item.toString()}
				/>
			))}
		</Stack>
	) : null;
};
