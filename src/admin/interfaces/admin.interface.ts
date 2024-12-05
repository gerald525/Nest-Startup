export interface Admin {
	name: string;
	role: string;

	getRole(): string;
}