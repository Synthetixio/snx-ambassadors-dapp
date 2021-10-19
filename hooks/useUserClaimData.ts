import { useEffect, useState } from 'react';
import MerkleTree from 'constants/MerkleTreeClaim.json';

type Claim = {
	index: number;
	amount: string;
	proof: string[];
};

type MerkleTreeType = {
	merkleRoot: string;
	tokenTotal: string;
	claims: Record<string, Claim>;
};

type ClaimData = {
	address: string;
	index: number;
	amount: string;
	proof: string[];
	hasClaim: boolean;
};

function useUserClaimData(account: string) {
	const [claimData, setClaimData] = useState<ClaimData | null>(null);
	const tree = MerkleTree as MerkleTreeType;
	useEffect(() => {
		if (account.length === 0 || !tree) return;
		if (tree.claims[account]) {
			setClaimData({
				address: account,
				index: tree.claims[account].index,
				proof: tree.claims[account].proof,
				amount: tree.claims[account].amount,
				hasClaim: true,
			});
		} else {
			setClaimData({
				address: '',
				index: -1,
				proof: [],
				amount: '',
				hasClaim: false,
			});
		}
	}, [account, tree]);

	return claimData;
}

export default useUserClaimData;
