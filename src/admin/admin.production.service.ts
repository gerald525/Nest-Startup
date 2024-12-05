import { AdminService } from './admin.service';

export class AdminProductionService extends AdminService {

  constructor() {
		super();
    this.name = 'prod admin';
    this.role = 'prod';
  }

  getRole(): string {
    return this.role;
  }
}
