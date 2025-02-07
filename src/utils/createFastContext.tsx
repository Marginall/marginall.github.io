
import React, {
	createContext,
	useCallback,
	useContext,
	useRef,
	useSyncExternalStore,
} from 'react';

export type ProviderType<Store> = React.FC<{
	initialState: Store;
	children: React.ReactNode;
}>;

export interface UseStoreType<Store> {
	<SelectorOutput>(
		selector: (store: Store) => SelectorOutput
	): [
		SelectorOutput,
		(value: Partial<Store> | ((state: Store) => Partial<Store>)) => void,
	];
}

/**
 * Створює Провайдер для обміну високошвидкісними даними.
 * Детальніше:
 * - [Відео](https://www.youtube.com/watch?v=ZKlXqrcBx88)
 * - [Репозиторій](https://github.com/jherr/fast-react-context)
 */
export function createFastContext<Store>(): {
	Provider: React.FC<{ initialState: Store; children: React.ReactNode }>;
	useStore<SelectorOutput>(
		selector: (store: Store) => SelectorOutput
	): [
		SelectorOutput,
		(value: Partial<Store> | ((state: Store) => Partial<Store>)) => void,
	];
} {
	function useStoreData(initialState: Store): {
		get: () => Store;
		set: (
			value: Partial<Store> | ((state: Store) => Partial<Store>)
		) => void;
		subscribe: (callback: () => void) => () => void;
		initialState: Store;
	} {
		const store = useRef(initialState);
		const get = useCallback(() => store.current, []);
		const subscribers = useRef(new Set<() => void>());

		const set = useCallback(
			(value: Partial<Store> | ((state: Store) => Partial<Store>)) => {
				store.current = {
					...store.current,
					...(typeof value === 'function'
						? value(store.current)
						: value),
				};
				subscribers.current.forEach((callback) => callback());
			},
			[]
		);

		const subscribe = useCallback((callback: () => void) => {
			subscribers.current.add(callback);
			return () => subscribers.current.delete(callback);
		}, []);

		return {
			get,
			set,
			subscribe,
			initialState: { ...initialState },
		};
	}

	const StoreContext = createContext<ReturnType<typeof useStoreData> | null>(
		null
	);

	return {
		Provider: ({ children, initialState }) => (
			<StoreContext.Provider value={useStoreData(initialState)}>
				{children}
			</StoreContext.Provider>
		),

		useStore: (selector) => {
			const store = useContext(StoreContext);
			if (!store) {
				throw new Error('Store not found');
			}

			const state = useSyncExternalStore(
				store.subscribe,
				() => selector(store.get()),
				() => selector(store.initialState)
			);

			return [state, store.set];
		},
	};
}
