import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiBearerAuth, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger'
import { QuestionService } from './question.service'
import {
	QuestionCreateRequestDto,
	QuestionFindFullResponseDto,
	QuestionDeleteRequestDto,
	QuestionFindAllRequestDto,
	QuestionFindFullRequestDto,
	QuestionFindOneRequestDto,
	QuestionUpdateRequestDto,
	QuestionFindAllResponseDto,
	QuestionFindOneResponseDto,
	QuestionsCreateWithAnswersDto,
} from './dtos'
import {
	QuestionCreateResponse,
	QuestionDeleteResponse,
	QuestionFindAllResponse,
	QuestionFindFullResponse,
	QuestionFindOneResponse,
	QuestionUpdateResponse,
	QuestionsCreateWithAnswersResponse,
} from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from '../../constants'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadedTxtFile } from '../../interfaces'
import { CheckAuthGuard } from '../../guards'

@ApiTags('Question')
@UseGuards(CheckAuthGuard)
@ApiBearerAuth()
@Controller('question')
export class QuestionController {
	private readonly service: QuestionService

	constructor(service: QuestionService) {
		this.service = service
	}

	@Get('full')
	@ApiResponse({ type: QuestionFindFullResponseDto, isArray: true })
	findFull(@Query() payload: QuestionFindFullRequestDto): Promise<QuestionFindFullResponse> {
		return this.service.findFull(payload)
	}

	@Get('all')
	@ApiResponse({ type: QuestionFindAllResponseDto })
	findAll(@Query() payload: QuestionFindAllRequestDto): Promise<QuestionFindAllResponse> {
		return this.service.findAll({ ...payload, pageSize: PAGE_SIZE, pageNumber: PAGE_NUMBER })
	}

	@Get(':id')
	@ApiResponse({ type: QuestionFindOneResponseDto })
	findOne(@Param() payload: QuestionFindOneRequestDto): Promise<QuestionFindOneResponse> {
		return this.service.findOne(payload)
	}

	@Post('file')
	@UseInterceptors(
		FileInterceptor('file', {
			fileFilter(req, file, cb) {
				if (file.mimetype !== 'text/plain') {
					return cb(new BadRequestException('Invalid file type'), false)
				}
				cb(null, true)
			},
		}),
	)
	@ApiConsumes('multipart/form-data')
	@ApiResponse({ type: null })
	createQuestionsWithFile(@Body() payload: QuestionsCreateWithAnswersDto, @UploadedFile() file: UploadedTxtFile): Promise<QuestionsCreateWithAnswersResponse> {
		return this.service.createManyWithAnswers(payload, file.buffer.toString('utf-8'))
	}

	@Post()
	@ApiResponse({ type: null })
	create(@Body() payload: QuestionCreateRequestDto): Promise<QuestionCreateResponse> {
		return this.service.create(payload)
	}

	@Patch(':id')
	@ApiResponse({ type: null })
	update(@Param() params: QuestionFindOneRequestDto, @Body() payload: QuestionUpdateRequestDto): Promise<QuestionUpdateResponse> {
		return this.service.update(params, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: null })
	delete(@Param() payload: QuestionDeleteRequestDto): Promise<QuestionDeleteResponse> {
		return this.service.delete(payload)
	}
}
