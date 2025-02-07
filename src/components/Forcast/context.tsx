import { createFastContext } from "../../utils/createFastContext";

interface ContextType {
	userPosition: {
		latitude: number | null,
		longitude: number | null
	}
	city: string;
}

const { Provider, useStore } = createFastContext<ContextType>();

export { Provider, useStore };
