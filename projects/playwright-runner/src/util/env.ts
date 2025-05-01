export const getEnvOrThrow = (key: string): string => {
	const value: string | undefined = process.env[key];
	if (value === undefined) {
		throw new Error(`Environment variable ${key} is not set.`);
	}
	return value;
}