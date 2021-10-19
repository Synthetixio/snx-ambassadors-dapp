import { useEffect, useState, useCallback } from 'react';
import Connector from 'containers/Connector';
import { ethers } from 'ethers';
import MerkleTree from 'contracts/MerkleTree';
import { merkleTreeAddress } from 'constants/merkleAddress';

const useTotalRewardsLeft = () => {
	const { provider } = Connector.useContainer();
	const [totalSupply, setTotalSupply] = useState<string | null>(null);

	const getTotalSupply = useCallback(async () => {
		const contract = new ethers.Contract(merkleTreeAddress, MerkleTree.abi, provider as any);
		const total = ethers.utils.formatEther(await contract.totalSupply());
		setTotalSupply(total);
	}, [provider]);

	useEffect(() => {
		if (provider) {
			getTotalSupply();
		}
	}, [provider, getTotalSupply]);

	return totalSupply;
};

export default useTotalRewardsLeft;
