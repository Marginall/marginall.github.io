import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { 
	// useActionState,
	useState
} from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Icon, Stack, useTheme } from '@mui/material';
// import { useStore } from "../../context";
// import { fetchForcast } from "../../../../utils/fetchForcast";
import { APIKEY } from "../../../../constants";

export const SearchForm: React.FC = () => {
	const [options, setOptions] = useState<{ label: string; id: string; key: number }[]>([]);
	const theme = useTheme();
	// const [, formAction, isPending] = useActionState(action, null);
	// const [, setStore] = useStore(
	// 	(store) => store.city
	// );

	// async function action(currentState: unknown, formData: FormData) {
	// 	const userCities = new Set(
	// 		JSON.parse(localStorage.getItem('userCities') || '[]')
	// 	);
	// 	const query = formData.get('search');
	// 	if (query) {
	// 		const response = await fetchForcast(query.toString());
	// 		if (response) {
	// 			setStore({
	// 				city: query.toString().toLowerCase()
	// 			});
	// 			if (userCities.size >= 3) {
	// 				const firstValue = userCities.values().next().value;
	// 				userCities.delete(firstValue);
	// 			}
	// 			userCities.add(query);
	// 			localStorage.setItem('userCities', JSON.stringify([...userCities]));
	// 		}
	// 	}
	// }
	const fetchOptions = async (query: string) => {
		if (query.length > 2) {
			const response = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${APIKEY}&q=${query}`);
			setOptions(response.data.map((item: { name: string; id: number }) => {
				return { label: item.name, id: item.id, key: item.id };
			}));
		}
	};

	return (
		<Box
			component="form"
			// action={formAction}
			sx={{
				backgroundColor: theme.palette.background.default,
				borderRadius: 1,
				p: 3
			}}
		>
			<Stack direction="row" spacing={2}>
				<Autocomplete
					disablePortal
					options={options}
					onInputChange={(_, value) => fetchOptions(value)}
					renderOption={(props, option) => (
						<li {...props} key={option.id}>
							{option.label}
						</li>
					)}
					sx={{ width: { xs: 250, sm: 300 } }}
					renderInput={(params) => (
						<TextField {...params} name="search" label="Search" />
					)}
				/>

				<Button
					type="submit"
					variant="contained"
					// disabled={isPending}
				>
					<Icon component={SearchIcon} color="action" />
				</Button>
			</Stack>
		</Box>
	);
};
