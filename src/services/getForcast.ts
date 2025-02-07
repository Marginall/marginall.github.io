import axios from "axios";
import { APIKEY } from "../constants";

class ForcastService {
	private URL = 'http://api.weatherapi.com/v1/forecast.json';

	getForcast(city: string) {
		return axios.get(this.URL, {
			params: {
				key: APIKEY,
				q: city,
				days: 3
			}
		});
	}
	getForcastByCity(city: string) {
		return axios.get(this.URL, {
			params: {
				key: APIKEY,
				q: city,
				days: 3
			}
		});
	}
};

export const forcastService = new ForcastService();
