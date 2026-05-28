import { createContext } from 'svelte';

interface TabContext {
	uid: string;
	selected: string | null;
	values: string[];
}

export const [getTabContext, setTabContext] = createContext<TabContext>();
