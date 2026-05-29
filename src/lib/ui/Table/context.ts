import { createContext } from 'svelte';

interface TableContext {
	selected: number;
	counter: number;
}

export const [getTableContext, setTableContext] = createContext<TableContext>();
