import { authApi } from '@/features/auth';
import { guidanceApi } from '@/entities/guidance';
import { redirect } from './redirect';

export const middlewares = [redirect, authApi.middleware, guidanceApi.middleware];
