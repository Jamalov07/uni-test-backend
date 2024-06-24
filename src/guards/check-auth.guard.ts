import { CanActivate, ExecutionContext, Injectable, MethodNotAllowedException, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { PrismaService } from '../modules'
import { JwtService } from '@nestjs/jwt'
import { JwtConfig } from '../configs'
import { isUUID } from 'class-validator'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../constants'

@Injectable()
export class CheckAuthGuard implements CanActivate {
	private readonly jwtService: JwtService
	private readonly prismaService: PrismaService
	private readonly reflector: Reflector
	constructor(prismaService: PrismaService, jwtService: JwtService, reflector: Reflector) {
		this.jwtService = jwtService
		this.reflector = reflector
		this.prismaService = prismaService
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>()

		console.log(request.url)
		// if (request.url === '/user/sign-in') {
		// 	return true
		// }
		// const authorization = request.headers.authorization
		// if (!authorization) {
		// 	throw new UnauthorizedException('Authorization not provided')
		// }

		// const token = authorization.split(' ')[1]

		// if (!token) {
		// 	throw new UnauthorizedException('Token not provided')
		// }

		// const user = await this.jwtService.verifyAsync(token, { secret: JwtConfig.accessToken.key }).catch((e) => {
		// 	console.log(e)
		// 	return undefined
		// })
		// if (!user) {
		// 	throw new UnauthorizedException('Invalid access token')
		// }
		// if (!user?.id || !isUUID(user?.id, '4')) {
		// 	throw new UnauthorizedException('Invalid access token')
		// }

		// const userData = await this.prismaService.user.findFirst({ where: { id: user?.id, deletedAt: null } })
		// if (!userData) {
		// 	throw new UnauthorizedException('User not found')
		// }
		// const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler())
		// if (requiredRoles && requiredRoles.length) {
		// 	if (!requiredRoles.includes(userData.type)) {
		// 		throw new MethodNotAllowedException('You are not allowed')
		// 	}
		// }
		return true
	}
}
