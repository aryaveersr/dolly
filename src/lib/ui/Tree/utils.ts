export function lastVisibleDescendant(ul: HTMLElement): HTMLButtonElement {
	while (ul.lastElementChild?.ariaExpanded === 'true') {
		ul = ul.lastElementChild.querySelector('ul')!;
	}

	const descendant = ul.lastElementChild ?? ul.parentElement!;
	return descendant.querySelector('button')!;
}

export function lastVisibleNode(el: HTMLElement): HTMLButtonElement | null {
	if (el.previousElementSibling) {
		if (el.previousElementSibling.ariaExpanded === 'true') {
			return lastVisibleDescendant(el.previousElementSibling.querySelector('ul')!);
		} else {
			return el.previousElementSibling.querySelector('button')!;
		}
	} else if (el.parentElement!.role === 'group') {
		return el.parentElement!.parentElement!.querySelector('button')!;
	} else {
		return null;
	}
}

export function nextVisibleNode(el: HTMLElement): HTMLButtonElement | null {
	let parent = el.parentElement!;
	while (!parent.nextElementSibling && parent.role != 'tree') {
		parent = parent.parentElement!;
	}

	return parent.role === 'tree' ? null : parent.nextElementSibling!.querySelector('button');
}
