export interface LoggerInterface {
	level: string;
	message: string;
	functionName: string;
	data?: any;
}