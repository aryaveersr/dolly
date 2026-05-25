import { createContext } from 'svelte';

interface TableContext {
	unselectCurrent: null | (() => void);
}

export const [getTableContext, setTableContext] = createContext<TableContext>();
