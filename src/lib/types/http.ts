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

export type Body = RawBody | ParsedBody;

export interface RawBody {
	kind: 'raw';
	data: Uint8Array;
}

export interface ParsedBody {
	kind: 'parsed';
}
