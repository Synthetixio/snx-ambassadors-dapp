import { useQuery } from 'react-query';
import graphResultsPager from 'graph-results-pager';
import QUERY_KEYS from 'constants/queryKeys';
import { protocolsBySymbol, SupportedProtocol } from 'constants/protocols';
import { ambassadorMultisig } from 'constants/ambassadorMultisig';
import { useRecoilValue } from 'recoil';
import { appReadyState } from 'store/app';
import { ethers } from 'ethers';

export type DelegateInfo = {
	id: string;
	delegatedVotes: number;
	tokenHoldersRepresentedAmount: number;
	votes: {
		proposal: number;
		votes: number;
		support: boolean;
	}[];
};

export const useDelegateInfoQuery = (protocolId: SupportedProtocol) => {
	const isAppReady = useRecoilValue(appReadyState);

	return useQuery<DelegateInfo>(
		QUERY_KEYS.Delegate.Info(protocolId),
		async () => {
			const protocolsObj = protocolsBySymbol();

			const properties =
				protocolId === SupportedProtocol.AAVE
					? [
							'id',
							'totalVotingPower',
							'usersVotingRepresentedAmount',
							'votes{id,support,votingPower,proposal{id}}',
					  ]
					: [
							'id',
							'delegatedVotes',
							'tokenHoldersRepresentedAmount',
							'votes{id,support,votes,proposal{id}}',
					  ];

			const delegatesResult = await graphResultsPager({
				api: protocolsObj[protocolId].subgraph,
				query: {
					entity: 'delegates',
					selection: {
						orderBy: 'id',
						orderDirection: 'desc',
						where: {
							id: `\\"${ambassadorMultisig.toLocaleLowerCase()}\\"`,
						},
					},
					properties: properties,
				},
			});

			if (protocolId === SupportedProtocol.AAVE) {
				delegatesResult[0].delegatedVotes = delegatesResult[0].totalVotingPower;
				delegatesResult[0].tokenHoldersRepresentedAmount =
					delegatesResult[0].usersVotingRepresentedAmount;
			}

			let votes = [] as any;

			if (delegatesResult && delegatesResult[0] && delegatesResult[0].votes.length > 0) {
				if (protocolId === SupportedProtocol.AAVE) {
					votes = delegatesResult[0].votes
						.sort((a: any, b: any) => (parseInt(a.proposal.id) > parseInt(b.proposal.id) ? 1 : -1))
						.map((v: { proposal: { id: string }; support: boolean; votingPower: string }) => ({
							proposal: parseInt(v.proposal.id),
							votes: parseFloat(ethers.utils.formatEther(v.votingPower)),
							support: v.support,
						}));
				} else {
					votes = delegatesResult[0].votes
						.sort((a: any, b: any) => (parseInt(a.proposal.id) > parseInt(b.proposal.id) ? 1 : -1))
						.map((v: { proposal: { id: string }; support: boolean; votes: string }) => ({
							proposal: parseInt(v.proposal.id),
							votes: parseFloat(v.votes),
							support: v.support,
						}));
				}
			}

			return {
				id: delegatesResult[0]?.id ?? '0',
				delegatedVotes: delegatesResult[0] ? Number(delegatesResult[0].delegatedVotes) : 0,
				tokenHoldersRepresentedAmount: delegatesResult[0]?.tokenHoldersRepresentedAmount ?? 0,
				votes: votes,
			};
		},
		{
			enabled: isAppReady,
		}
	);
};
