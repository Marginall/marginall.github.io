import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { forcastService } from "../../../services/getForcast";
import { useEffect } from "react";
import { ServerForecast, ServerForecastday, ServerForecastdayHourType } from "../../../types";
import format from "date-fns/format";

export const useForcast = (city: string) => {
	const { data: forcast, isLoading, isSuccess, isError, refetch } = useQuery({
		enabled: !!city,
		queryKey: ['forcast', {city}],
		queryFn: () => forcastService.getForcast(city.toLowerCase()),
		placeholderData: keepPreviousData,
		select: (forcast): ServerForecast => {
			return {
				data: {
					temp: forcast.data.current.temp_c,
					condition: {
						text: forcast.data.current.condition.text,
						icon: 'https:' + forcast.data.current.condition.icon
					},
					location: {
						name: forcast.data.location.name,
						region: forcast.data.location.region,
						country: forcast.data.location.country
					},
					forecastday: forcast.data.forecast.forecastday.map(
						(item: ServerForecastday, index: number) => {
							return {
								id: 'day' + index + 1,
								date: format(new Date(item.date), 'MM/dd/yyyy'),
								location: forcast.data.location.name,
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
		},
		staleTime: 60000
	});
	useEffect(() => {
		if (isSuccess) {
			console.log('Success fetching forcast data');
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isError) {
			console.log('Error fetching forcast data');
		}
	}, [isError]);

	return { forcast, isLoading, isError, refetch };
};
