import { Forcast } from './components/Forcast';
import {
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router';

const App = () => {
	const queryClient = new QueryClient();
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="forcast" element={<Forcast />} />
					<Route path="images" element={<div>123123213</div>} />
				</Routes>
			</QueryClientProvider>
		</BrowserRouter>
	);
};

export default App;
