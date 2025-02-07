import { createContext } from 'react';

interface ThemeContextType {
	toggleTheme: () => void;
	mode: string;
}

export const ThemeContext = createContext<ThemeContextType>({
	toggleTheme: () => {},
	mode: 'light'
});
