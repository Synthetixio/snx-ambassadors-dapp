import { SupportedProtocol } from 'constants/protocols';
import { DelegateInfo, useDelegateInfoQuery } from 'queries/useDelegateInfoQuery';

type DelegateData = {
	[name: string]: {
		data: DelegateInfo | undefined;
	};
};

const useProtocolDelegateData = (): DelegateData => {
	const uniInfo = useDelegateInfoQuery(SupportedProtocol.UNI);
	const compInfo = useDelegateInfoQuery(SupportedProtocol.COMP);
	const aaveInfo = useDelegateInfoQuery(SupportedProtocol.AAVE);
	const radInfo = useDelegateInfoQuery(SupportedProtocol.RAD);
	const poolInfo = useDelegateInfoQuery(SupportedProtocol.POOL);

	return {
		[SupportedProtocol.UNI]: {
			data: uniInfo.data,
		},
		[SupportedProtocol.COMP]: {
			data: compInfo.data,
		},
		[SupportedProtocol.AAVE]: {
			data: aaveInfo.data,
		},
		[SupportedProtocol.RAD]: {
			data: radInfo.data,
		},
		[SupportedProtocol.POOL]: {
			data: poolInfo.data,
		},
	};
};

export default useProtocolDelegateData;
