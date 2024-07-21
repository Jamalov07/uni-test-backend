import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	UserCreateRequest,
	UserCreateResponse,
	UserCreateWithJsonFileRequest,
	UserDeleteRequest,
	UserDeleteResponse,
	UserFindAllRequest,
	UserFindAllResponse,
	UserFindFullRequest,
	UserFindFullResponse,
	UserFindOneRequest,
	UserFindOneResponse,
	UserUpdateRequest,
} from './interfaces'
import { FacultyFindOneResponse } from '../faculty'
import { CourseFindOneResponse } from '../course'
import { SemestrFindOneResponse } from '../semestr'
import { GroupFindOneResponse } from '../group'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findFull(payload: UserFindFullRequest): Promise<UserFindFullResponse> {
		const users = await this.prisma.user.findMany({
			where: {
				fullName: { contains: payload.fullName, mode: 'insensitive' },
				emailAddress: { contains: payload.emailAddress, mode: 'insensitive' },
				type: payload.type,
				deletedAt: null,
			},
			select: {
				id: true,
				createdAt: true,
				fullName: true,
				emailAddress: true,
				image: true,
				type: true,
				userInfo: {
					select: {
						hemisId: true,
						group: {
							select: {
								id: true,
								course: { select: { id: true, stage: true, createdAt: true } },
								faculty: { select: { id: true, name: true, createdAt: true } },
								semestr: { select: { id: true, stage: true, createdAt: true } },
								name: true,
								createdAt: true,
							},
						},
						id: true,
						createdAt: true,
					},
				},
			},
			orderBy: [{ createdAt: 'desc' }],
		})

		return users
	}

	async findAll(payload: UserFindAllRequest): Promise<UserFindAllResponse> {
		const users = await this.prisma.user.findMany({
			where: {
				fullName: { contains: payload.fullName, mode: 'insensitive' },
				emailAddress: { contains: payload.emailAddress, mode: 'insensitive' },
				type: payload.type,
				deletedAt: null,
			},
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
			select: {
				id: true,
				createdAt: true,
				fullName: true,
				emailAddress: true,
				image: true,
				type: true,
				userInfo: {
					select: {
						hemisId: true,
						group: {
							select: {
								id: true,
								course: { select: { id: true, stage: true, createdAt: true } },
								faculty: { select: { id: true, name: true, createdAt: true } },
								semestr: { select: { id: true, stage: true, createdAt: true } },
								name: true,
								createdAt: true,
							},
						},
						id: true,
						createdAt: true,
					},
				},
			},
			orderBy: [{ createdAt: 'desc' }],
		})

		const usersCount = await this.prisma.user.count({
			where: {
				fullName: { contains: payload.fullName, mode: 'insensitive' },
				emailAddress: { contains: payload.emailAddress, mode: 'insensitive' },
				type: payload.type,
				deletedAt: null,
			},
		})

		return {
			pageSize: users.length,
			totalCount: usersCount,
			pageCount: Math.ceil(usersCount / payload.pageSize),
			data: users,
		}
	}

	async findOne(payload: UserFindOneRequest): Promise<UserFindOneResponse> {
		const user = await this.prisma.user.findFirst({
			where: { id: payload.id, deletedAt: null },
			select: {
				id: true,
				createdAt: true,
				fullName: true,
				emailAddress: true,
				image: true,
				type: true,
				userInfo: {
					select: {
						hemisId: true,
						group: {
							select: {
								id: true,
								course: { select: { id: true, stage: true, createdAt: true } },
								faculty: { select: { id: true, name: true, createdAt: true } },
								semestr: { select: { id: true, stage: true, createdAt: true } },
								name: true,
								createdAt: true,
							},
						},
						id: true,
						createdAt: true,
					},
				},
			},
		})

		return user
	}

	async findOneWithPassword(payload: UserFindOneRequest): Promise<UserFindOneResponse> {
		const user = await this.prisma.user.findFirst({
			where: { id: payload.id, deletedAt: null },
			select: {
				id: true,
				createdAt: true,
				fullName: true,
				emailAddress: true,
				image: true,
				password: true,
				type: true,
				userInfo: {
					select: {
						hemisId: true,
						group: {
							select: {
								id: true,
								course: { select: { id: true, stage: true, createdAt: true } },
								faculty: { select: { id: true, name: true, createdAt: true } },
								semestr: { select: { id: true, stage: true, createdAt: true } },
								name: true,
								createdAt: true,
							},
						},

						id: true,
						createdAt: true,
					},
				},
			},
		})

		return user
	}

	async findByEmail(payload: Partial<UserFindOneResponse>): Promise<UserFindOneResponse> {
		const user = await this.prisma.user.findFirst({ where: { emailAddress: payload.emailAddress, id: { not: payload.id }, deletedAt: null } })
		return user
	}

	async create(payload: UserCreateRequest): Promise<UserCreateResponse> {
		await this.prisma.user.create({
			data: { fullName: payload.fullName, emailAddress: payload.emailAddress, password: payload.password, type: payload.type, image: payload.image ?? '' },
		})
		return null
	}

	async createWithReturningId(payload: UserCreateRequest): Promise<string> {
		const user = await this.prisma.user.create({
			data: { fullName: payload.fullName, emailAddress: payload.emailAddress, password: payload.password, type: payload.type, image: payload.image ?? '' },
		})
		return user.id
	}

	async createWithJsonFile(payload: UserCreateWithJsonFileRequest[]): Promise<null> {
		const promises: any[] = []

		const facultyNames: string[] = []
		const faculties: FacultyFindOneResponse[] = []
		const courseStages: number[] = []
		const courses: CourseFindOneResponse[] = []
		const semestrStages: number[] = []
		const semestrs: SemestrFindOneResponse[] = []
		const groupNames: string[] = []
		const groups: GroupFindOneResponse[] = []

		for (const u of payload) {
			//faculty
			let faculty: FacultyFindOneResponse
			if (facultyNames.includes(u.faculty)) {
				faculty = faculties.find((f) => f.name == u.faculty)
			} else {
				faculty = await this.prisma.faculty.findFirst({ where: { name: u.faculty, deletedAt: null } })
				if (!faculty) {
					faculty = await this.prisma.faculty.create({ data: { name: u.faculty }, select: { id: true, name: true, createdAt: true } })
				}
				facultyNames.push(faculty.name)
				faculties.push(faculty)
			}

			//course
			let course: CourseFindOneResponse
			if (courseStages.includes(u.course)) {
				course = courses.find((c) => c.stage === u.course)
			} else {
				course = await this.prisma.course.findFirst({ where: { stage: u.course, deletedAt: null } })
				if (!course) {
					course = await this.prisma.course.create({ data: { stage: u.course }, select: { id: true, stage: true, createdAt: true } })
				}
				courseStages.push(course.stage)
				courses.push(course)
			}

			//semestr
			let semestr: SemestrFindOneResponse
			if (semestrStages.includes(u.semestr)) {
				semestr = semestrs.find((s) => s.stage === u.semestr)
			} else {
				semestr = await this.prisma.semestr.findFirst({ where: { stage: u.semestr, deletedAt: null } })
				if (!semestr) {
					semestr = await this.prisma.semestr.create({ data: { stage: u.semestr }, select: { id: true, stage: true, createdAt: true } })
				}
				semestrStages.push(semestr.stage)
				semestrs.push(semestr)
			}

			//group
			let group: GroupFindOneResponse
			if (groupNames.includes(u.group)) {
				group = groups.find((g) => g.name === u.group)
				if (group.course.id !== course.id || group.faculty.id !== faculty.id || group.semestr.id !== semestr.id) {
					throw new BadRequestException(`Fileni o'qishda xatolik. Talaba ma'lumotlarida xatolik mavjud.` + u.full_name)
				}
			} else {
				group = await this.prisma.group.findFirst({
					where: { name: u.group, deletedAt: null },
					select: {
						id: true,
						name: true,
						createdAt: true,
						faculty: { select: { id: true, name: true, createdAt: true } },
						semestr: { select: { id: true, stage: true, createdAt: true } },
						course: { select: { id: true, stage: true, createdAt: true } },
					},
				})
				if (!group) {
					group = await this.prisma.group.create({
						data: { name: u.group, facultyId: faculty.id, courseId: course.id, semestrId: semestr.id },
						select: {
							id: true,
							name: true,
							createdAt: true,
							faculty: { select: { id: true, name: true, createdAt: true } },
							semestr: { select: { id: true, stage: true, createdAt: true } },
							course: { select: { id: true, stage: true, createdAt: true } },
						},
					})
				}
				if (group.course.id !== course.id || group.faculty.id !== faculty.id || group.semestr.id !== semestr.id) {
					throw new BadRequestException(`Fileni o'qishda xatolik. Talaba ma'lumotlarida xatolik mavjud.` + u.full_name)
				}
				groupNames.push(group.name)
				groups.push(group)
			}

			const userPromise = await this.prisma.user
				.create({
					data: {
						fullName: u.full_name,
						image: u.image ?? '',
						password: await bcrypt.hash(u.password, 7),
						type: 'student',
					},
				})
				.then((user) => {
					return this.prisma.userInfo.create({
						data: {
							userId: user.id,
							hemisId: u.hemis_id,
							groupId: group.id,
						},
					})
				})

			promises.push(userPromise)
		}

		await Promise.all(promises)

		return null
	}

	async update(payload: UserFindOneRequest & UserUpdateRequest): Promise<UserUpdateRequest> {
		await this.prisma.user.update({
			where: { id: payload.id, deletedAt: null },
			data: { fullName: payload.fullName, emailAddress: payload.emailAddress, password: payload.password, type: payload.type, image: payload.image },
		})
		return null
	}

	async delete(payload: UserDeleteRequest): Promise<UserDeleteResponse> {
		await this.prisma.user.update({ where: { id: payload.id, deletedAt: null }, data: { deletedAt: new Date() } })
		return null
	}
}
