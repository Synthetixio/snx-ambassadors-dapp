import { useQuery } from 'react-query';
import graphResultsPager from 'graph-results-pager';
import QUERY_KEYS from 'constants/queryKeys';
import { protocolsBySymbol, SupportedProtocol } from 'constants/protocols';

export type GlobalData = {
	id: string;
	totalTokenHolders: number;
	totalDelegates: number;
	delegatedVotes: number;
	delegatedVotesRaw: number;
};

export const useProtocolGlobalDataQuery = (protocolId: SupportedProtocol) => {
	return useQuery<GlobalData | undefined>(QUERY_KEYS.Protocol.Global(protocolId), async () => {
		const protocolsObj = protocolsBySymbol();

		const subgraph =
			protocolId === SupportedProtocol.AAVE
				? 'https://api.thegraph.com/subgraphs/name/aave/governance-sybil'
				: protocolsObj[protocolId].subgraph;

		const governancesResults = await graphResultsPager({
			api: subgraph,
			query: {
				entity: 'governances',
				properties: [
					'id',
					'delegatedVotes',
					'delegatedVotesRaw',
					'totalTokenHolders',
					'totalDelegates',
				],
			},
		});

		return {
			id: governancesResults[0].id,
			delegatedVotes: Number(governancesResults[0].delegatedVotes),
			delegatedVotesRaw: Number(governancesResults[0].delegatedVotesRaw),
			totalDelegates: Number(governancesResults[0].totalDelegates),
			totalTokenHolders: Number(governancesResults[0].totalTokenHolders),
		};
	});
};
