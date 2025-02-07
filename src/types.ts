export interface IForcast {
	data: {
		temp: string;
		condition: {
			text: string;
			icon: string;
		};
		location: {
			name: string;
			region: string;
			country: string;
		};
		forecastday: ForecastdayType[];
	} | null;
}

export interface ForecastdayType {
	id: string;
	date: string;
	location: string;
	maxTem: number; // Изменено с string на number
	minTem: number;
	condition: {
		text: string;
		icon: string;
	};
	hours: {
		time: string;
		temp: number;
		wind: number;
		condition: {
			text: string;
			icon: string;
		};
	}[];
}

export interface ServerForecast {
	data: {
		temp: number;
		condition: {
			text: string;
			icon: string;
		};
		location: {
			name: string;
			region: string;
			country: string;
		};
		forecastday: {
			id: string;
			date: string;
			location: string;
			maxTem: number;
			minTem: number;
			condition: {
				text: string;
				icon: string;
			};
			hours: {
				time: string;
				temp: number;
				wind: number;
				condition: {
					text: string;
					icon: string;
				};
			}[];
		}[];
	};
}

export interface ServerForecastday {
	date: string;
	day: {
		maxtemp_c: number;
		mintemp_c: number;
		condition: {
			text: string;
			icon: string;
		};
	};
	hour: ServerForecastdayHourType[];
}

export type ServerForecastdayHourType = {
	time: string;
	temp_c: number;
	wind_kph: number;
	condition: {
		text: string;
		icon: string;
	};
};
