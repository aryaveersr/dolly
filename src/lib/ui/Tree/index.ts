import Root from './partials/Root.svelte';
import Leaf from './partials/Leaf.svelte';
import Branch from './partials/Branch.svelte';

export default Object.assign(Root, { Leaf, Branch });
