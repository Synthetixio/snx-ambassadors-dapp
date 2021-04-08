export type Token = {
	chainId: number;
	address: string;
	name: string;
	symbol: string;
	decimals: number;
	logoURI: string;
};

export type TokenListResponse = {
	keywords: string[];
	logoURI: string;
	name: string;
	timestamp: string;
	tokens: Token[];
	version: { major: number; minor: number; patch: number };
};
