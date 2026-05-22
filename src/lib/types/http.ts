export interface RequestData {
	method: string;
	headers: Record<string, string>;
	url: URL;
	body: Uint8Array;
}

export interface ResponseData {
	status: number;
	headers: Record<string, string>;
	body: Uint8Array;
}
