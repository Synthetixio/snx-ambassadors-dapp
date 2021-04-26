import { useQuery } from 'react-query';
import QUERY_KEYS from 'constants/queryKeys';
import { protocolsBySymbol, SupportedProtocol } from 'constants/protocols';
import { ethers } from 'ethers';
import { useRecoilValue } from 'recoil';
import { isWalletConnectedState, walletAddressState } from 'store/wallet';
import UNI from 'contracts/UNI';
import AAVE from 'contracts/AAVE';
import Connector from 'containers/Connector';
import { isAddress } from 'utils/address';
import { appReadyState } from 'store/app';
import { ambassadorMultisig } from 'constants/ambassadorMultisig';

export const useDelegatorInfoQuery = (protocolId: SupportedProtocol) => {
	const isAppReady = useRecoilValue(appReadyState);
	const isWalletConnected = useRecoilValue(isWalletConnectedState);
	const walletAddress = useRecoilValue(walletAddressState);
	const { provider } = Connector.useContainer();

	return useQuery<number>(
		QUERY_KEYS.Delegator.Info(protocolId, walletAddress ?? ''),
		async () => {
			const protocolsObj = protocolsBySymbol();

			let delegatee;
			let tokenContract;

			if (protocolId === SupportedProtocol.AAVE) {
				tokenContract = new ethers.Contract(
					protocolsObj[protocolId].address,
					AAVE.abi,
					provider as any
				);

				delegatee = await tokenContract.getDelegateeByType(walletAddress, 0);
			} else {
				tokenContract = new ethers.Contract(
					protocolsObj[protocolId].address,
					UNI.abi,
					provider as any
				);

				delegatee = await tokenContract.delegates(walletAddress);
			}

			let amountDelegated = 0;

			if (isAddress(delegatee) === isAddress(ambassadorMultisig)) {
				amountDelegated = Number(
					ethers.utils.formatEther(await tokenContract.balanceOf(walletAddress))
				);
			}

			return amountDelegated;
		},
		{
			enabled: isAppReady && isWalletConnected && provider != null,
		}
	);
};
