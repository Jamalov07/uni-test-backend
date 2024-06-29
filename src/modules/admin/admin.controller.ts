import { BadGatewayException, Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AdminService } from './admin.service'
import {
	AdminCreateRequestDto,
	AdminFindFullResponseDto,
	AdminDeleteRequestDto,
	AdminFindAllRequestDto,
	AdminFindFullRequestDto,
	AdminFindOneRequestDto,
	AdminUpdateRequestDto,
	AdminFindAllResponseDto,
	AdminFindOneResponseDto,
	AdminSignInRequestDto,
	AdminSignInResponseDto,
} from './dtos'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { AdminCreateResponse, AdminDeleteResponse, AdminFindAllResponse, AdminFindFullResponse, AdminFindOneResponse, AdminSignInResponse, AdminUpdateResponse } from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from '../../constants'
import { CheckAuthGuard } from '../../guards'
import { FileInterceptor } from '@nestjs/platform-express'

@ApiTags('Admin')
@ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
@UseGuards(CheckAuthGuard)
@Controller('admin')
export class AdminController {
	private readonly service: AdminService

	constructor(service: AdminService) {
		this.service = service
	}

	@Get('full')
	@ApiResponse({ type: AdminFindFullResponseDto, isArray: true })
	findFull(@Query() payload: AdminFindFullRequestDto): Promise<AdminFindFullResponse> {
		return this.service.findFull(payload)
	}

	@Get('all')
	@ApiResponse({ type: AdminFindAllResponseDto })
	findAll(@Query() payload: AdminFindAllRequestDto): Promise<AdminFindAllResponse> {
		return this.service.findAll({ ...payload, pageSize: PAGE_SIZE, pageNumber: PAGE_NUMBER })
	}

	@Get(':id')
	@ApiResponse({ type: AdminFindOneResponseDto })
	findOne(@Param() payload: AdminFindOneRequestDto): Promise<AdminFindOneResponse> {
		return this.service.findOne(payload)
	}

	@Post()
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: join(__dirname, '..', '..', '..', 'images'),
				filename: (req, file, callback) => {
					const uniqueSuffix = `${uuidv4()}-${Date.now()}`
					const ext = extname(file.originalname)
					const filename = `${uniqueSuffix}${ext}`
					callback(null, filename)
				},
			}),
			fileFilter: (req, file, callback) => {
				if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
					return callback(new BadGatewayException('Only image files are allowed!'), false)
				}
				callback(null, true)
			},
		}),
	)
	@ApiResponse({ type: null })
	create(@Body() payload: AdminCreateRequestDto, @UploadedFile() image: Express.Multer.File): Promise<AdminCreateResponse> {
		const imagePath = image ? `/uploads/${image.filename}` : ''
		return this.service.create({ ...payload, image: imagePath })
	}

	@Post('sign-in')
	@ApiResponse({ type: AdminSignInResponseDto })
	signIn(@Body() payload: AdminSignInRequestDto): Promise<AdminSignInResponse> {
		return this.service.singIn(payload)
	}

	@Patch(':id')
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: join(__dirname, '..', '..', '..', 'images'),
				filename: (req, file, callback) => {
					const uniqueSuffix = `${uuidv4()}-${Date.now()}`
					const ext = extname(file.originalname)
					const filename = `${uniqueSuffix}${ext}`
					callback(null, filename)
				},
			}),
			fileFilter: (req, file, callback) => {
				if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
					return callback(new BadGatewayException('Only image files are allowed!'), false)
				}
				callback(null, true)
			},
		}),
	)
	@ApiResponse({ type: null })
	update(@Param() params: AdminFindOneRequestDto, @Body() payload: AdminUpdateRequestDto, @UploadedFile() image?: Express.Multer.File): Promise<AdminUpdateResponse> {
		const imagePath = image ? `/uploads/${image.filename}` : undefined
		return this.service.update(params, { ...payload, image: imagePath })
	}

	@Delete(':id')
	@ApiResponse({ type: null })
	delete(@Param() payload: AdminDeleteRequestDto): Promise<AdminDeleteResponse> {
		return this.service.delete(payload)
	}
}
