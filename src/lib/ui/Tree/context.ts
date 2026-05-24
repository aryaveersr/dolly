import { createContext } from 'svelte';

interface TreeContext {
	unselectCurrent: null | (() => void);
}

export const [getTreeContext, setTreeContext] = createContext<TreeContext>();
