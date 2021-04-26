import { SupportedProtocol } from './protocols';

export const QUERY_KEYS = {
	Delegate: {
		Info: (protocolId: SupportedProtocol) => ['delegate', 'info', protocolId],
	},
	Delegator: {
		Info: (protocolId: SupportedProtocol, walletAddress: string) => [
			'delegator',
			'info',
			protocolId,
			walletAddress,
		],
	},
	Protocol: {
		Global: (protocolId: SupportedProtocol) => ['protocol', 'global', protocolId],
		Proposals: (protocolId: SupportedProtocol) => ['protocol', 'proposals', protocolId],
	},
};

export default QUERY_KEYS;
