import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { themeLight } from './theme-light';
import { themeDark } from './theme-dark';
import { ThemeContext } from './context';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [mode, setMode] = useState<'light' | 'dark'>(() => {
		const savedMode = localStorage.getItem('theme');
		return savedMode === 'dark' ? 'dark' : 'light';
	});

	const toggleTheme = () => {
		setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	useEffect(() => {
		localStorage.setItem('theme', mode);
	}, [mode]);

	return (
		<ThemeContext.Provider value={{ toggleTheme, mode }}>
			<MuiThemeProvider theme={mode === 'light' ? themeLight : themeDark}>{children}</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
