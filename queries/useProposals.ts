import { useQuery } from 'react-query';
import graphResultsPager from 'graph-results-pager';
import QUERY_KEYS from 'constants/queryKeys';
import { protocolsBySymbol, SupportedProtocol } from 'constants/protocols';
import { appReadyState } from 'store/app';
import { useRecoilValue } from 'recoil';

export type Proposal = {
	calldatas: string[];
	description: string;
	endBlock: string;
	id: string;
	proposer: {
		id: string;
	};
	signatures: string[];
	startBlock: string;
	status: string;
	targets: string[];
	values: string[];
};

export const useProtocolProposals = (protocolId: SupportedProtocol) => {
	const isAppReady = useRecoilValue(appReadyState);

	return useQuery<Proposal[]>(
		QUERY_KEYS.Protocol.Proposals(protocolId),
		async () => {
			const protocolsObj = protocolsBySymbol();

			const subgraph =
				protocolId === SupportedProtocol.AAVE
					? 'https://api.thegraph.com/subgraphs/name/aave/governance-sybil'
					: protocolsObj[protocolId].subgraph;

			const proposalsResult = await graphResultsPager({
				api: subgraph,
				query: {
					entity: 'proposals',
					selection: {
						first: 100,
						orderBy: 'startBlock',
						orderDirection: 'desc',
					},
					properties: [
						'id',
						'targets',
						'values',
						'signatures',
						'status',
						'calldatas',
						'description',
						'startBlock',
						'endBlock',
						'proposer{id}',
					],
				},
			});

			return proposalsResult;
		},
		{
			enabled: isAppReady,
		}
	);
};
