export type Body = RawBody | ParsedBody;

export interface RawBody {
	kind: 'raw';
	data: string;
}

export type ParsedBody = Empty | Binary | String | Json;

export interface Empty {
	kind: 'empty';
}

export interface Binary {
	kind: 'binary';
	data: Uint8Array;
}

export interface String {
	kind: 'string';
	data: string;
}

export interface Json {
	kind: 'json';
	data: JSONValue;
}

export type JSONValue =
	| string
	| number
	| boolean
	| null
	| { [x: string]: JSONValue }
	| Array<JSONValue>;
