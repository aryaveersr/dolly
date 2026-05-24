import { createContext } from 'svelte';

interface TreeContext {
	getRoot: () => HTMLUListElement;
	unselectCurrent: null | (() => void);
}

export const [getTreeContext, setTreeContext] = createContext<TreeContext>();
