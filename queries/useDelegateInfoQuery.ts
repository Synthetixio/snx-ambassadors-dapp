import { useQuery } from 'react-query';
import graphResultsPager from 'graph-results-pager';
import QUERY_KEYS from 'constants/queryKeys';
import { protocolsBySymbol, SupportedProtocol } from 'constants/protocols';
import { ambassadorMultisig } from 'constants/ambassadorMultisig';
import { useRecoilValue } from 'recoil';
import { appReadyState } from 'store/app';

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
						'votes{id,support,votesRaw,votes,voter{id},proposal{id}}',
					],
				},
			});

			let votes = [] as any;

			if (delegatesResult && delegatesResult[0] && delegatesResult[0].votes.length > 0) {
				votes = delegatesResult[0].votes
					.sort((a: any, b: any) => (parseInt(a.proposal.id) > parseInt(b.proposal.id) ? 1 : -1))
					.map((v: { proposal: { id: string }; support: boolean; votes: string }) => ({
						proposal: parseInt(v.proposal.id),
						votes: parseFloat(v.votes),
						support: v.support,
					}));
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
