import { createTheme } from '@mui/material/styles';

export const breakpoints = {
	xs: 0,
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536
};

export const spacing = [
	0,
	4,
	8,
	16,
	24,
	32,
	40,
	48,
	56,
	64,
	72,
	80,
	120,
	160,
	200,
	320,
	400
	// 1  2  3   4   5   6   7   8   9   10  11  12   13   14   15   16
];

export const themeLight = createTheme({
	palette: {
		mode: 'light',
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
			default: '#F6F7FA',
			paper: '#ffffff'
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
	typography: {
		fontFamily: 'sans-serif',
		h1: {
			fontSize: '1.75rem',
			lineHeight: 1.21,
			letterSpacing: '-0.04em',
			fontWeight: 600,
			[`@media (min-width: ${breakpoints.lg}px)`]: {
				fontSize: '3rem'
			}
		},
		h2: {
			fontSize: '1.5rem',
			lineHeight: 1.21,
			letterSpacing: '-0.03em',
			fontWeight: 600,
			[`@media (min-width: ${breakpoints.lg}px)`]: {
				fontSize: '2.5rem'
			}
		},
		h3: {
			fontSize: '1.4375rem',
			lineHeight: 1.21,
			letterSpacing: '-0.01em',
			fontWeight: 600,
			[`@media (min-width: ${breakpoints.lg}px)`]: {
				fontSize: '2rem'
			}
		},
		h4: {
			fontSize: '1.125rem',
			lineHeight: 1.21,
			letterSpacing: '-0.02em',
			fontWeight: 600,
			[`@media (min-width: ${breakpoints.lg}px)`]: {
				fontSize: '1.5rem'
			}
		},
		h5: {
			fontSize: '1rem',
			lineHeight: 1.21,
			fontWeight: 600,
			letterSpacing: '-0.1px',
			[`@media (min-width: ${breakpoints.lg}px)`]: {
				fontSize: '1.125rem'
			}
		},
		h6: {
			fontSize: '0.875rem',
			lineHeight: 1.21,
			fontWeight: 500,
			letterSpacing: '0px'
		},
		subtitle1: {
			fontSize: '15px',
			lineHeight: 1.4,
			letterSpacing: '0.1px',
			fontWeight: 500
		},
		subtitle2: {
			fontSize: '13px',
			lineHeight: 1.4,
			fontWeight: 500,
			letterSpacing: '-0.25px'
		},
		body1: {
			fontSize: '15px',
			lineHeight: 1.45,
			letterSpacing: '-0.2px',
			fontWeight: 400,
			[`@media (min-width: ${breakpoints.lg}px)`]: {
				fontSize: '16px'
			}
		},
		body2: {
			fontSize: '13px',
			lineHeight: 1.4,
			letterSpacing: '-0.1px',
			fontWeight: 400,
			[`@media (min-width: ${breakpoints.lg}px)`]: {
				fontSize: '14px'
			}
		},
		button: {
			fontSize: '13px',
			fontWeight: 500,
			letterSpacing: '0px',
			lineHeight: '1.5'
		}
	},
	breakpoints: {
		values: breakpoints
	},
	spacing: spacing,
	components: {}
});
