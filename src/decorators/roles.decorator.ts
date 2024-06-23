import { SetMetadata } from '@nestjs/common'
import { ROLES_KEY } from '../constants'

export const Roles = (...roles: ('admin' | 'student')[]) => SetMetadata(ROLES_KEY, roles)
