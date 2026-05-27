import type { Body } from '$lib/types/body';

export interface RequestData {
	method: string;
	headers: Record<string, string>;
	url: URL;
	body: Body;
}

export interface ResponseData {
	status: number;
	headers: Record<string, string>;
	body: Body;
}
