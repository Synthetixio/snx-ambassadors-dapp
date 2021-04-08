import React, { useMemo } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import SectionHeader from 'components/SectionHeader';
import { useTranslation } from 'react-i18next';
import { FlexDivRow } from 'styles/common';
import DelegationBox from 'components/DelegationBox';
import useTokenList from 'queries/tokenLists/useTokenLists';
import { MAX_PAGE_WIDTH } from 'styles/constants';

const HomePage: React.FC = () => {
	const { t } = useTranslation();
	const tokenListQuery = useTokenList();
	const tokenList = useMemo(() => (tokenListQuery.isSuccess ? tokenListQuery.data ?? null : null), [
		tokenListQuery.isSuccess,
		tokenListQuery.data,
	]);

	const SUPPORTED_PROTOCOLS = ['UNI', 'COMP', 'AAVE'];

	return (
		<>
			<Head>
				<title>Ambassadors</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<>
				<SectionHeader title={t('delegation.title')} first />
				<BoxContainer>
					{SUPPORTED_PROTOCOLS.map((symbol, i) => {
						if (tokenList) {
							return (
								<>
									<DelegationBox
										key={i}
										tokenInfo={tokenList[symbol]}
										votingPower={'0'}
										delegated={'0'}
									/>
								</>
							);
						}
					})}
				</BoxContainer>
			</>
		</>
	);
};

export default HomePage;

const BoxContainer = styled(FlexDivRow)<{ first?: boolean }>`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: ${(props) => (props.first ? '120px auto 20px auto' : '40px auto 20px auto')};
	font-size: 28px;
	line-height: 120%;
	font-family: ${(props) => `${props.theme.fonts.expanded}, ${props.theme.fonts.regular}`};
	color: ${(props) => props.theme.colors.white};
	text-transform: uppercase;
`;
