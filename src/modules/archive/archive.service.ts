import { BadRequestException, Injectable } from '@nestjs/common'
import { ArchiveRepository } from './archive.repository'
import {
	ArchiveCreateRequest,
	ArchiveCreateResponse,
	ArchiveDeleteRequest,
	ArchiveDeleteResponse,
	ArchiveFindAllRequest,
	ArchiveFindAllResponse,
	ArchiveFindFullRequest,
	ArchiveFindFullResponse,
	ArchiveFindOneRequest,
	ArchiveFindOneResponse,
	ArchiveUpdateRequest,
	ArchiveUpdateResponse,
} from './interfaces'
import { UserCollectionRepository } from '../user-collection'
import * as ExcelJs from 'exceljs'
import { Response } from 'express'
@Injectable()
export class ArchiveService {
	private readonly repository: ArchiveRepository
	private readonly userCollectionRepository: UserCollectionRepository

	constructor(repository: ArchiveRepository, userCollectionRepository: UserCollectionRepository) {
		this.repository = repository
		this.userCollectionRepository = userCollectionRepository
	}

	async findFull(payload: ArchiveFindFullRequest): Promise<ArchiveFindFullResponse> {
		const Archives = this.repository.findFull(payload)
		return Archives
	}

	async findAll(payload: ArchiveFindAllRequest): Promise<ArchiveFindAllResponse> {
		const Archives = this.repository.findAll(payload)
		return Archives
	}

	async findOne(payload: ArchiveFindOneRequest): Promise<ArchiveFindOneResponse> {
		const Archive = await this.repository.findOne(payload)
		if (!Archive) {
			throw new BadRequestException('Archive not found')
		}
		return Archive
	}

	async create(payload: ArchiveCreateRequest): Promise<ArchiveCreateResponse> {
		const userCollection = await this.userCollectionRepository.findByUserCollection({ collectionId: payload.collectionId, userId: payload.userId })
		console.log('userCollec', userCollection)
		if (!userCollection || !userCollection.haveAttempt) {
			throw new BadRequestException("You haven't attempt for this collection")
		}
		await this.repository.create(payload)

		if (userCollection.haveAttempt === 1) {
			await this.userCollectionRepository.delete({ id: userCollection.id })
		} else {
			await this.userCollectionRepository.update({ id: userCollection.id, haveAttempt: userCollection.haveAttempt - 1 })
		}

		return null
	}

	async update(params: ArchiveFindOneRequest, payload: ArchiveUpdateRequest): Promise<ArchiveUpdateResponse> {
		await this.findOne({ id: params.id })

		await this.repository.update({ ...params, ...payload })
		return null
	}

	async delete(payload: ArchiveDeleteRequest): Promise<ArchiveDeleteResponse> {
		await this.findOne(payload)
		await this.repository.delete(payload)
		return null
	}

	async downloadInExcel(payload: ArchiveFindFullRequest, res: Response): Promise<void> {
		const archives = await this.repository.findFullForExcel(payload)

		const workbook = new ExcelJs.Workbook()
		const worksheet = workbook.addWorksheet('results')

		const mappedArchives = archives.map((a, i) => {
			return [
				i + 1,
				a.user.fullName,
				a.faculty.name,
				a.course.stage,
				a.semestr.stage,
				a.group.name,
				a.collection.science.name,
				a.collection.name,
				this.formatDate(a.startTime),
				this.formatDate(a.endTime),
				a.testCount,
				a.result,
			]
		})

		const headerCellStyle = {
			fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '000000' } },
			font: { color: { argb: 'FFFFFF' } },
			border: {
				top: { style: 'thin', color: { argb: 'FFFFFF' } },
				left: { style: 'thin', color: { argb: 'FFFFFF' } },
				bottom: { style: 'thin', color: { argb: 'FFFFFF' } },
				right: { style: 'thin', color: { argb: 'FFFFFF' } },
			},
		}

		const table = [
			['№', 'F.I.SH', 'Fakultet', 'Kurs', 'Semestr', 'Guruh', 'Fan', 'Test', 'Boshlangan vaqt', 'Tugatilgan vaqt', 'Umumiy testlar soni', 'Natija'],
			// [0, 'Qodirov Jahongir', 'Bugalteriya', 1, 1, 'Buxgalteriya ishi', 'Tarix', 'Tarix yakuniy test', this.formatDate(new Date()), this.formatDate(new Date()), 10, 5],
			...mappedArchives,
		]

		table.forEach((row, index) => {
			worksheet.addRow(row)
			if (index === 0) {
				const header = worksheet.getRow(index + 1)
				header.eachCell((cell) => {
					cell.style = headerCellStyle as ExcelJs.Style
				})
			}
		})

		workbook.eachSheet((worksheet) => {
			worksheet.eachRow((row) => {
				row.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' }
			})

			worksheet.views = [
				{
					state: 'frozen',
					ySplit: 1,
					xSplit: 2,
				},
			]
			worksheet.columns.forEach((column, i) => {
				if (i == 0) {
					column.width = 10
				} else {
					column.width = 20
				}
			})
		})

		const buffer = await workbook.xlsx.writeBuffer()
		res.setHeader('Content-Disposition', 'attachment; filename="archives.xlsx"')
		res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
		res.write(buffer)
		res.end()
	}

	formatDate(date: any) {
		const options = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		}

		return date.toLocaleString('en-GB', options).replace(',', '')
	}
}
