import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Header from 'components/Header';
import { useTranslation } from 'react-i18next';
import { GridDiv } from 'styles/common';
import { MAX_PAGE_WIDTH } from 'styles/constants';
import ProtocolBox from 'sections/home/ProtocolBox';
import { protocols } from 'constants/protocols';
import useProtocolDelegateData from 'hooks/useDelegateInfoForProtocols';
import useProtocolDelegatorData from 'hooks/useDelegatorInfoForProtocols';

const Delegate: React.FC = () => {
	const { t } = useTranslation();
	const protocolDelegates = useProtocolDelegateData();
	const protocolDelegators = useProtocolDelegatorData();
	return (
		<>
			<Head>
				<title>{t('Delegate | Synthetix Ambassadors')}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Page>
				<Header title={t('delegation.title')} />
				<StyledGrid>
					{protocols.map((protocol, i) => {
						return (
							<ProtocolBox
								key={i}
								tokenInfo={protocol}
								votingPower={protocolDelegates[protocol.symbol]?.data?.delegatedVotes ?? 0}
								delegated={protocolDelegators[protocol.symbol]?.data ?? 0}
							/>
						);
					})}
				</StyledGrid>
			</Page>
		</>
	);
};

export default Delegate;

const Page = styled.div`
	padding-bottom: 24px;
`;

const StyledGrid = styled(GridDiv)`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: 0 auto;
	column-gap: 16px;
	grid-template-columns: auto auto auto;
	padding: 0px 16px;

	@media only screen and (max-width: 1020px) {
		grid-template-columns: auto;
	}
`;
