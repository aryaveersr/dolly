import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import { createRawSnippet } from 'svelte';

import Wrapper from './Wrapper.svelte';

const mockData = (() => {
	const rows: { [key: string]: string } = {};
	for (let i = 0; i < 20; i++) rows[`table-key-${i}`] = `table-value-${i}`;
	return rows;
})();

const buttonSnippet = createRawSnippet(() => ({
	render: () => `<button id="test-btn">Test</button>`
}));

describe('Table', () => {
	it('renders in correct order', async () => {
		await render(Wrapper, { rows: mockData });

		const table = page.getByRole('table');
		const rows = page.getByRole('row');
		const cells = page.getByRole('cell');

		await expect.element(table).toBeInTheDocument();
		expect(rows.length).toBe(21);
		expect(cells.length).toBe(63);

		const contents = cells.elements().map((cell) => cell.textContent);

		expect(contents[0]).toBe('tableKey');
		expect(contents[1]).toBe('tableValue');

		for (let i = 1; i < 21; i++) {
			expect(contents[i * 3]).toBe(`table-key-${i - 1}`);
			expect(contents[i * 3 + 1]).toBe(`table-value-${i - 1}`);
		}
	});

	it('renders without any rows', async () => {
		await render(Wrapper, { rows: {} });

		const table = page.getByRole('table');
		const rows = page.getByRole('row');
		const cells = page.getByRole('cell');

		await expect.element(table).toBeInTheDocument();
		expect(rows.length).toBe(1);
		expect(cells.length).toBe(3);
	});

	it('correctly reports clicks', async () => {
		const onclick = vi.fn();

		await render(Wrapper, { rows: mockData, onclick });

		const rowButtons = page.getByRole('button', { name: /row-btn-/ });

		expect(rowButtons.length).toBe(20);

		for (let i = 0; i < 20; i++) {
			await rowButtons.nth(i).click();
			expect(onclick).toHaveBeenCalledTimes(i + 1);
			expect(onclick).toHaveBeenCalledWith(i);
		}
	});

	it('does not capture focus if it is empty', async () => {
		await render(Wrapper, { rows: {}, before: buttonSnippet, after: buttonSnippet });

		const beforeBtn = page.getByRole('button', { name: 'Test' }).first();
		const afterBtn = page.getByRole('button', { name: 'Test' }).last();

		await beforeBtn.click();
		expect(beforeBtn).toHaveFocus();
		await userEvent.tab();
		expect(afterBtn).toHaveFocus();
	});

	it('has the first row active if no rows were clicked', async () => {
		await render(Wrapper, { rows: mockData, before: buttonSnippet, after: buttonSnippet });

		const rowButtons = page.getByRole('button', { name: /row-btn-/ });
		const beforeBtn = page.getByRole('button', { name: 'Test' }).first();
		const afterBtn = page.getByRole('button', { name: 'Test' }).last();

		await beforeBtn.click();
		expect(beforeBtn).toHaveFocus();
		await userEvent.tab();
		expect(rowButtons.first()).toHaveFocus();
		expect(afterBtn).not.toHaveFocus();
		await userEvent.tab();
		expect(afterBtn).toHaveFocus();
	});

	it('handles focus correctly when a row is clicked', async () => {
		await render(Wrapper, { rows: mockData, before: buttonSnippet, after: buttonSnippet });

		const rowButtons = page.getByRole('button', { name: /row-btn-/ });
		const beforeBtn = page.getByRole('button', { name: 'Test' }).first();
		const afterBtn = page.getByRole('button', { name: 'Test' }).last();

		await rowButtons.nth(7).click();
		expect(rowButtons.nth(7)).toHaveFocus();

		await rowButtons.nth(4).click();
		expect(rowButtons.nth(4)).toHaveFocus();

		await beforeBtn.click();
		expect(beforeBtn).toHaveFocus();
		await userEvent.tab();
		expect(rowButtons.nth(4)).toHaveFocus();
		expect(rowButtons.first()).not.toHaveFocus();
		await userEvent.tab();
		expect(afterBtn).toHaveFocus();
	});

	it('moves focus correctly when arrow keys are pressed', async () => {
		await render(Wrapper, { rows: mockData, before: buttonSnippet, after: buttonSnippet });

		const rowButtons = page.getByRole('button', { name: /row-btn-/ });
		const beforeBtn = page.getByRole('button', { name: 'Test' }).first();
		const afterBtn = page.getByRole('button', { name: 'Test' }).last();

		await rowButtons.nth(7).click();
		expect(rowButtons.nth(7)).toHaveFocus();

		await userEvent.keyboard('{ArrowUp}');

		expect(rowButtons.nth(6)).toHaveFocus();

		await userEvent.keyboard('{ArrowUp}');
		await userEvent.keyboard('{ArrowUp}');
		await userEvent.keyboard('{ArrowUp}');
		await userEvent.keyboard('{ArrowDown}');

		expect(rowButtons.nth(4)).toHaveFocus();

		await beforeBtn.click();
		expect(beforeBtn).toHaveFocus();
		await userEvent.tab();
		expect(rowButtons.nth(4)).toHaveFocus();
		expect(rowButtons.first()).not.toHaveFocus();
		await userEvent.tab();
		expect(afterBtn).toHaveFocus();
	});

	it('does not move focus when arrow keys are pressed at extreme ends', async () => {
		await render(Wrapper, { rows: mockData });

		const rowButtons = page.getByRole('button', { name: /row-btn-/ });

		await rowButtons.nth(0).click();
		expect(rowButtons.nth(0)).toHaveFocus();
		await userEvent.keyboard('{ArrowUp}');
		expect(rowButtons.nth(0)).toHaveFocus();

		await rowButtons.nth(19).click();
		expect(rowButtons.nth(19)).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		expect(rowButtons.nth(19)).toHaveFocus();
	});
});
