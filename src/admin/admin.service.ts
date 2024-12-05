import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
	name: string;
	role: string;

	getRole(): string {
		return "admin"
	}
}
