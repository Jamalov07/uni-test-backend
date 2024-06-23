import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'
import { SignInTokenDefinition, UserFindOneResponse } from '../user'
import { JwtConfig } from '../../configs'

@Injectable()
export class JWTService {
	private readonly jwtService: JwtService
	constructor(jwtService: JwtService) {
		this.jwtService = jwtService
	}

	async getTokens(payload: Partial<UserFindOneResponse>): Promise<SignInTokenDefinition> {
		return {
			accessToken: await this.getAccessToken(payload),
			refreshToken: await this.getRefreshToken(payload),
		}
	}

	async getAccessToken(payload: Partial<UserFindOneResponse>): Promise<string> {
		const accessToken = await this.jwtService.signAsync(payload, {
			secret: JwtConfig.accessToken.key,
			expiresIn: JwtConfig.accessToken.time,
		})

		return accessToken
	}

	async getRefreshToken(payload: Partial<UserFindOneResponse>): Promise<string> {
		const refreshToken = await this.jwtService.signAsync(payload, {
			secret: JwtConfig.refreshToken.key,
			expiresIn: JwtConfig.refreshToken.time,
		})
		return refreshToken
	}

	async verifyAccessToken(token: string): Promise<object> {
		const user = await this.jwtService.verifyAsync(token, {
			secret: JwtConfig.accessToken.key,
		})

		return { id: user?.id }
	}
	async verifyRefreshToken(token: string): Promise<object> {
		const user = await this.jwtService.verifyAsync(token, {
			secret: JwtConfig.refreshToken.key,
		})

		return { id: user?.id }
	}
}
