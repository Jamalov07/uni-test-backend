import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CourseService } from './course.service'
import {
	CourseCreateRequestDto,
	CourseFindFullResponseDto,
	CourseDeleteRequestDto,
	CourseFindAllRequestDto,
	CourseFindFullRequestDto,
	CourseFindOneRequestDto,
	CourseUpdateRequestDto,
	CourseFindAllResponseDto,
	CourseFindOneResponseDto,
} from './dtos'
import { CourseCreateResponse, CourseDeleteResponse, CourseFindAllResponse, CourseFindFullResponse, CourseFindOneResponse, CourseUpdateResponse } from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from '../../constants'
import { CheckAuthGuard } from '../../guards'

@ApiTags('Course')
@ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
@UseGuards(CheckAuthGuard)
@Controller('course')
export class CourseController {
	private readonly service: CourseService

	constructor(service: CourseService) {
		this.service = service
	}

	@Get('full')
	@ApiResponse({ type: CourseFindFullResponseDto, isArray: true })
	findFull(@Query() payload: CourseFindFullRequestDto): Promise<CourseFindFullResponse> {
		return this.service.findFull(payload)
	}

	@Get('all')
	@ApiResponse({ type: CourseFindAllResponseDto })
	findAll(@Query() payload: CourseFindAllRequestDto): Promise<CourseFindAllResponse> {
		return this.service.findAll({ ...payload, pageNumber: PAGE_NUMBER, pageSize: PAGE_SIZE })
	}

	@Get(':id')
	@ApiResponse({ type: CourseFindOneResponseDto })
	findOne(@Param() payload: CourseFindOneRequestDto): Promise<CourseFindOneResponse> {
		return this.service.findOne(payload)
	}

	@Post()
	@ApiResponse({ type: null })
	create(@Body() payload: CourseCreateRequestDto): Promise<CourseCreateResponse> {
		return this.service.create(payload)
	}

	@Patch(':id')
	@ApiResponse({ type: null })
	update(@Param() params: CourseFindOneRequestDto, @Body() payload: CourseUpdateRequestDto): Promise<CourseUpdateResponse> {
		return this.service.update(params, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: null })
	delete(@Param() payload: CourseDeleteRequestDto): Promise<CourseDeleteResponse> {
		return this.service.delete(payload)
	}
}
