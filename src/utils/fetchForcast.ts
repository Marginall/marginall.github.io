import axios from "axios";
import { format } from "date-fns";
import { APIKEY } from "../constants";
import { ServerForecastday, ServerForecastdayHourType } from "../types";

export const fetchForcast = async (query: string = '', latitude: number | null = null, longitude: number | null = null) => {
	const response = await axios.get(
		'http://api.weatherapi.com/v1/forecast.json',
		{
			params: {
				key: APIKEY,
				q: longitude && latitude ? `${latitude},${longitude}` : query,
				days: 5
			}
		}
	);
	return {
		data: {
			temp: response.data.current.temp_c,
			condition: {
				text: response.data.current.condition.text,
				icon: 'https:' + response.data.current.condition.icon
			},
			location: {
				name: response.data.location.name,
				region: response.data.location.region,
				country: response.data.location.country
			},
			forecastday: response.data.forecast.forecastday.map(
				(item: ServerForecastday, index: number) => {
					return {
						id: 'day' + index + 1,
						date: format(new Date(item.date), 'MM/dd/yyyy'),
						location: response.data.location.name,
						maxTem: item.day.maxtemp_c,
						minTem: item.day.mintemp_c,
						condition: {
							text: item.day.condition.text,
							icon: 'https:' + item.day.condition.icon
						},
						hours: item.hour.map(
							(hour: ServerForecastdayHourType) => {
								return {
									time: hour.time,
									temp: hour.temp_c,
									wind: hour.wind_kph,
									condition: {
										text: hour.condition.text,
										icon: 'https:' + hour.condition.icon
									}
								};
							}
						)
					};
				}
			)
		}
	};
};
