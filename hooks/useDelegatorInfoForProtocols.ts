import { SupportedProtocol } from 'constants/protocols';
import { useDelegatorInfoQuery } from 'queries/useDelegatorInfoQuery';

type DelegatorData = {
	[name: string]: {
		data: number | undefined;
	};
};

const useProtocolDelegatorData = (): DelegatorData => {
	const uniInfo = useDelegatorInfoQuery(SupportedProtocol.UNI);
	const compInfo = useDelegatorInfoQuery(SupportedProtocol.COMP);
	const aaveInfo = useDelegatorInfoQuery(SupportedProtocol.AAVE);
	const radInfo = useDelegatorInfoQuery(SupportedProtocol.RAD);
	const poolInfo = useDelegatorInfoQuery(SupportedProtocol.POOL);

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

export default useProtocolDelegatorData;
