import { useQuery } from 'react-query';
import graphResultsPager from 'graph-results-pager';
import QUERY_KEYS from 'constants/queryKeys';
import { protocolsBySymbol, SupportedProtocol } from 'constants/protocols';
import { ambassadorMultisig } from 'constants/ambassadorMultisig';

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
	return useQuery<DelegateInfo | undefined>(QUERY_KEYS.Delegate.Info(protocolId), async () => {
		const protocolsObj = protocolsBySymbol();

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
				properties: [
					'id',
					'delegatedVotes',
					'tokenHoldersRepresentedAmount',
					'votes{id, proposal}',
				],
			},
		});

		if (delegatesResult && delegatesResult[0]) {
			// console.log(delegatesResult);
			// const votes = delegatesResult[0].votes
			// 	.sort((a: any, b: any) => (parseInt(a.proposal.id) > parseInt(b.proposal.id) ? 1 : -1))
			// 	.map((v: { proposal: { id: string }; support: boolean; votes: string }) => ({
			// 		proposal: parseInt(v.proposal.id),
			// 		votes: parseFloat(v.votes),
			// 		support: v.support,
			// 	}));

			return {
				id: delegatesResult[0].id,
				delegatedVotes: Number(delegatesResult[0].delegatedVotes),
				tokenHoldersRepresentedAmount: delegatesResult[0].tokenHoldersRepresentedAmount,
				votes: [],
			};
		} else {
			return undefined;
		}
	});
};
