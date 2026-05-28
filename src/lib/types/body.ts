export type Body = Empty | Binary | String | Json;

export interface Empty {
	kind: 'empty';
}

export interface Binary {
	kind: 'binary';
	data: string;
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
