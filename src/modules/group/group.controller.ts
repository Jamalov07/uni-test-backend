import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GroupService } from './group.service'
import {
	GroupCreateRequestDto,
	GroupFindFullResponseDto,
	GroupDeleteRequestDto,
	GroupFindAllRequestDto,
	GroupFindFullRequestDto,
	GroupFindOneRequestDto,
	GroupUpdateRequestDto,
	GroupFindAllResponseDto,
	GroupFindOneResponseDto,
} from './dtos'
import { GroupCreateResponse, GroupDeleteResponse, GroupFindAllResponse, GroupFindFullResponse, GroupFindOneResponse, GroupUpdateResponse } from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from '../../constants'
import { CheckAuthGuard } from '../../guards'

@ApiTags('Group')
@ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
@UseGuards(CheckAuthGuard)
@Controller('group')
export class GroupController {
	private readonly service: GroupService

	constructor(service: GroupService) {
		this.service = service
	}

	@Get('full')
	@ApiResponse({ type: GroupFindFullResponseDto, isArray: true })
	findFull(@Query() payload: GroupFindFullRequestDto): Promise<GroupFindFullResponse> {
		return this.service.findFull(payload)
	}

	@Get('all')
	@ApiResponse({ type: GroupFindAllResponseDto })
	findAll(@Query() payload: GroupFindAllRequestDto): Promise<GroupFindAllResponse> {
		return this.service.findAll({ ...payload, pageNumber: PAGE_NUMBER, pageSize: PAGE_SIZE })
	}

	@Get(':id')
	@ApiResponse({ type: GroupFindOneResponseDto })
	findOne(@Param() payload: GroupFindOneRequestDto): Promise<GroupFindOneResponse> {
		return this.service.findOne(payload)
	}

	@Post()
	@ApiResponse({ type: null })
	create(@Body() payload: GroupCreateRequestDto): Promise<GroupCreateResponse> {
		return this.service.create(payload)
	}

	@Patch(':id')
	@ApiResponse({ type: null })
	update(@Param() params: GroupFindOneRequestDto, @Body() payload: GroupUpdateRequestDto): Promise<GroupUpdateResponse> {
		return this.service.update(params, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: null })
	delete(@Param() payload: GroupDeleteRequestDto): Promise<GroupDeleteResponse> {
		return this.service.delete(payload)
	}
}
