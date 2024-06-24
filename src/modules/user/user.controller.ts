import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import {
	UserCreateRequestDto,
	UserFindFullResponseDto,
	UserDeleteRequestDto,
	UserFindAllRequestDto,
	UserFindFullRequestDto,
	UserFindOneRequestDto,
	UserUpdateRequestDto,
	UserFindAllResponseDto,
	UserFindOneResponseDto,
	UserSignInRequestDto,
	UserSignInResponseDto,
	UserCreateWithInfoRequestDto,
	UserCreateManyWithJsonFileDto,
} from './dtos'
import { UserCreateResponse, UserDeleteResponse, UserFindAllResponse, UserFindFullResponse, UserFindOneResponse, UserSignInResponse, UserUpdateResponse } from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from '../../constants'
import { CheckAuthGuard } from '../../guards'
import { FileInterceptor } from '@nestjs/platform-express'

@ApiTags('User')
@ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
@UseGuards(CheckAuthGuard)
@Controller('user')
export class UserController {
	private readonly service: UserService

	constructor(service: UserService) {
		this.service = service
	}

	@Get('full')
	@ApiResponse({ type: UserFindFullResponseDto, isArray: true })
	findFull(@Query() payload: UserFindFullRequestDto): Promise<UserFindFullResponse> {
		return this.service.findFull(payload)
	}

	@Get('all')
	@ApiResponse({ type: UserFindAllResponseDto })
	findAll(@Query() payload: UserFindAllRequestDto): Promise<UserFindAllResponse> {
		return this.service.findAll({ ...payload, pageSize: PAGE_SIZE, pageNumber: PAGE_NUMBER })
	}

	@Get(':id')
	@ApiResponse({ type: UserFindOneResponseDto })
	findOne(@Param() payload: UserFindOneRequestDto): Promise<UserFindOneResponse> {
		return this.service.findOne(payload)
	}

	@Post()
	@ApiResponse({ type: null })
	create(@Body() payload: UserCreateRequestDto): Promise<UserCreateResponse> {
		return this.service.create(payload)
	}

	@Post('with-info')
	@ApiResponse({ type: null })
	createWithInfo(@Body() payload: UserCreateWithInfoRequestDto): Promise<UserCreateResponse> {
		return this.service.createWithUserInfo(payload)
	}

	@Post('sign-in')
	@ApiResponse({ type: UserSignInResponseDto })
	signIn(@Body() payload: UserSignInRequestDto): Promise<UserSignInResponse> {
		return this.service.singIn(payload)
	}

	@Post('with-json')
	@UseInterceptors(
		FileInterceptor('file', {
			fileFilter: (req, file, cb) => {
				if (file.mimetype !== 'application/json') {
					return cb(new BadRequestException('Invalid file type'), false)
				}
				cb(null, true)
			},
		}),
	)
	@ApiResponse({ type: null })
	createManyWithJson(@UploadedFile() file: any): Promise<null> {
		const data = file.buffer.toString('utf8')
		const jsonData: UserCreateManyWithJsonFileDto[] = JSON.parse(data)

		return this.service.createManyWithJsonFile(jsonData)
	}

	@Patch(':id')
	@ApiResponse({ type: null })
	update(@Param() params: UserFindOneRequestDto, @Body() payload: UserUpdateRequestDto): Promise<UserUpdateResponse> {
		return this.service.update(params, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: null })
	delete(@Param() payload: UserDeleteRequestDto): Promise<UserDeleteResponse> {
		return this.service.delete(payload)
	}
}
