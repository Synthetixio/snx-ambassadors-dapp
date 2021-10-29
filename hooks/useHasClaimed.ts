import { useEffect, useState, useCallback } from 'react';
import Connector from 'containers/Connector';
import { ethers } from 'ethers';
import MerkleTree from 'contracts/MerkleTree';
import { merkleTreeAddress } from 'constants/merkleAddress';
import { useRecoilValue } from 'recoil';
import { walletAddressState } from 'store/wallet';

const useHasClaimed = (index: number | null) => {
	const walletAddress = useRecoilValue(walletAddressState);
	const { provider } = Connector.useContainer();
	const [claimed, setClaimed] = useState<boolean>(false);

	const getClaimable = useCallback(async () => {
		const contract = new ethers.Contract(merkleTreeAddress, MerkleTree.abi, provider as any);
		const hasClaimed = await contract.isClaimed(index);
		setClaimed(hasClaimed);
	}, [provider, index]);

	useEffect(() => {
		if (provider && walletAddress && index !== null) {
			getClaimable();
		}
	}, [provider, walletAddress, getClaimable, index]);

	return claimed;
};

export default useHasClaimed;
