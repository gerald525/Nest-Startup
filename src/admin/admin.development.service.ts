import { AdminService } from './admin.service';

export class AdminDevelopmentService extends AdminService {

	constructor() {
		super();
    this.name = 'dev admin';
    this.role = 'dev';
  }

  getRole(): string {
    return this.role;
  }
}
