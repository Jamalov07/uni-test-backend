// eslint-disable-next-line @typescript-eslint/no-empty-interface
export declare interface SemestrFindFullRequest {}

export declare interface SemestrFindAllRequest {
	pageNumber?: number
	pageSize?: number
}

export declare interface SemestrFindOneRequest {
	id: string
}

export declare interface SemestrCreateRequest {
	stage: number
}

export declare interface SemestrUpdateRequest {
	stage?: number
}

export declare interface SemestrDeleteRequest {
	id: string
}

//=========================

export declare type SemestrFindFullResponse = SemestrFindOneResponse[]

export declare interface SemestrFindAllResponse {
	totalCount: number
	pageSize: number
	pageCount: number
	data: SemestrFindOneResponse[]
}

export declare interface SemestrFindOneResponse {
	id: string
	stage: number
	createdAt: Date
}

export declare type SemestrCreateResponse = null

export declare type SemestrUpdateResponse = null

export declare type SemestrDeleteResponse = null
