import { NetworkId } from '@synthetixio/contracts-interface';
import { SupportedProtocol } from './protocols';

export const QUERY_KEYS = {
	Delegate: {
		DelegateInfo: (protocolId: SupportedProtocol) => ['delegate', 'delegateInfo', protocolId],
	},
};

export default QUERY_KEYS;
