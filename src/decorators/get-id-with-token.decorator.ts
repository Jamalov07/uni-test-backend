import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { JwtConfig } from '../configs'
import { isUUID } from 'class-validator'

export const UserIdInAccessToken = createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest<Request>()
	console.log(request.headers.authorization)

	const authorization = request.headers.authorization
	if (!authorization) {
		throw new UnauthorizedException('Authorization not provided')
	}

	const token = authorization.split(' ')[1]
	if (!token) {
		throw new UnauthorizedException('Token not provided')
	}

	const jwtService = new JwtService({ secret: JwtConfig.accessToken.key })
	let user
	try {
		user = await jwtService.verifyAsync(token)
	} catch (e) {
		console.log(e)
		throw new UnauthorizedException('Invalid access token')
	}

	if (!user?.id || !isUUID(user?.id, '4')) {
		throw new UnauthorizedException('Invalid access token')
	}

	return user?.id
})
