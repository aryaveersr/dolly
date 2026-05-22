import type { RequestData, ResponseData } from '$lib/types/http';

export type TrafficEntry = Header & (Pending | Success);

interface Header {
	id: string;
	request: RequestData;
}

interface Pending {
	status: 'pending';
}

interface Success {
	status: 'success';
	response: ResponseData;
}
