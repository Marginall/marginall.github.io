
import { createTheme } from '@mui/material';

export const themeDark = createTheme({
			palette: {
				mode: 'dark',
				text: {
					primary: '#252F38',
					secondary: '#9396A8'
				},
				primary: {
					main: '#FFB000',
					light: '#F7D589'
				},
				common: {
					black: '#252F38',
					white: '#FFFFFF'
				},
				background: {
					default: '#252F38',
					paper: 'rgba(0, 0, 0, 0.5)'
				},
				success: {
					main: '#87D474',
					light: '#C8E8C0'
				},
				error: {
					main: '#F54848',
					light: '#FA7878'
				},
				warning: {
					main: '#FFB000',
					dark: '#D09932'
				},
				info: {
					main: '#2FC1FF',
					dark: '#0FA2E1'
				},
				grey: {
					800: '#46474E',
					700: '#9396A8',
					600: '#B6C5D9',
					500: '#E6E9E8',
					400: '#E7ECF5',
					300: '#ECF0F4',
					200: '#F6F6F6',
					100: '#F4F7FC'
				},
				divider: '#E6E9E8' // grey[500]
			},
			components: {
				MuiCssBaseline: {
					styleOverrides: {
						html: {
							backgroundColor: '#121212',
							color: '#FFFFFF'
						},
						body: {
							backgroundColor: '#121212',
							color: '#FFFFFF'
						}
					}
				}
			},
		});
