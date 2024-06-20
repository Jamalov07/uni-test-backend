// eslint-disable-next-line @typescript-eslint/no-empty-interface
export declare interface ScienceFindFullRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export declare interface ScienceFindAllRequest {
	pageNumber?: number
	pageSize?: number
}

export declare interface ScienceFindOneRequest {
	id: string
}

export declare interface ScienceCreateRequest {
	name: string
}

export declare interface ScienceUpdateRequest {
	name?: string
}

export declare interface ScienceDeleteRequest {
	id: string
}

//=========================

export declare type ScienceFindFullResponse = ScienceFindOneResponse[]

export declare interface ScienceFindAllResponse {
	totalCount: number
	pageSize: number
	pageCount: number
	data: ScienceFindOneResponse[]
}

export declare interface ScienceFindOneResponse {
	id: string
	name: string
	createdAt: Date
}

export declare type ScienceCreateResponse = null

export declare type ScienceUpdateResponse = null

export declare type ScienceDeleteResponse = null
