import { createContext } from 'svelte';

interface TableContext {
	handleKeyDown: (ev: KeyboardEvent) => void;
	handleClick: (ev: MouseEvent, index: number) => void;
}

export const [getTableContext, setTableContext] = createContext<TableContext>();
