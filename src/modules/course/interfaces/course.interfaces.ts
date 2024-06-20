// eslint-disable-next-line @typescript-eslint/no-empty-interface
export declare interface CourseFindFullRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export declare interface CourseFindAllRequest {
	pageNumber?: number
	pageSize?: number
}

export declare interface CourseFindOneRequest {
	id: string
}

export declare interface CourseCreateRequest {
	stage: number
}

export declare interface CourseUpdateRequest {
	stage?: number
}

export declare interface CourseDeleteRequest {
	id: string
}

//=========================

export declare type CourseFindFullResponse = CourseFindOneResponse[]

export declare interface CourseFindAllResponse {
	totalCount: number
	pageSize: number
	pageCount: number
	data: CourseFindOneResponse[]
}

export declare interface CourseFindOneResponse {
	id: string
	stage: number
	createdAt: Date
}

export declare type CourseCreateResponse = null

export declare type CourseUpdateResponse = null

export declare type CourseDeleteResponse = null
