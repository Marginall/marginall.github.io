import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './theme/provider.tsx';
import { CssBaseline } from '@mui/material';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</StrictMode>
);
