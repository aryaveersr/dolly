import type { RequestData, ResponseData } from '$lib/types/http';

export type SseEvent = RequestEvent | ResponseEvent;

interface RequestEvent {
	id: string;
	kind: 'request';
	request: RequestData;
}

interface ResponseEvent {
	id: string;
	kind: 'response';
	response: ResponseData;
}
