import { Log } from './log.entity';

export const logProviders = [
	{
		provide: 'LogRepository',
		useValue: Log,
	},
];