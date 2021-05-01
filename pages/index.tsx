import React, { useMemo } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Header from 'components/Header';
import { Trans, useTranslation } from 'react-i18next';
import {
	FlexDivRow,
	Paragraph,
	GridDiv,
	StyledLink,
	ExternalLink,
	FlexDivCol,
	FlexDivCentered,
} from 'styles/common';
import { MAX_PAGE_WIDTH } from 'styles/constants';
import Table from 'components/Table';
import { CellProps } from 'react-table';
import ProtocolBox from 'sections/home/ProtocolBox';
import { protocols } from 'constants/protocols';
import useProtocolDelegateData from 'hooks/useDelegateInfoForProtocols';
import useProtocolDelegatorData from 'hooks/useDelegatorInfoForProtocols';
import { members, ambassadorMultisig } from 'constants/ambassadorMultisig';
import { Svg } from 'react-optimized-image';
import LinkIcon from 'assets/svg/link-blue.svg';
import { ethers } from 'ethers';

import HeroGraphic from 'assets/svg/hero.svg';

const HomePage: React.FC = () => {
	const { t } = useTranslation();

	const protocolDelegates = useProtocolDelegateData();
	const protocolDelegators = useProtocolDelegatorData();

	const memberColumns = useMemo(() => {
		const columns = [
			{
				Header: <>{t('members.table.name')}</>,
				accessor: 'name',
				Cell: (cellProps: CellProps<any>) => {
					return <StyledParagraph>{cellProps.value}</StyledParagraph>;
				},

				sortable: false,
				width: 600,
			},
			{
				Header: <>{t('members.table.address')}</>,
				accessor: 'address',
				Cell: (cellProps: CellProps<any>) => {
					return (
						<StyledAddressRow>
							<StyledParagraph>{ethers.utils.getAddress(cellProps.value)}</StyledParagraph>
							<StyledExternalIcon
								href={`https://etherscan.io/address/${ethers.utils.getAddress(cellProps.value)}`}
							>
								<Svg src={LinkIcon} />
							</StyledExternalIcon>
						</StyledAddressRow>
					);
				},
				sortable: false,
				width: 600,
			},
		];

		return columns;
	}, [t]);

	return (
		<>
			<Head>
				<title>{t('home.page-title')}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Page>
				<HeroContainer>
					<Hero>{t('home.hero')}</Hero>
					<StyledParagraph>{t('ambassadors.description')}</StyledParagraph>
				</HeroContainer>

				<SvgContainer>
					<HeroSvg src={HeroGraphic} />
				</SvgContainer>

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
				<Header title={t('members.title')} />
				<BoxContainer>
					<StyledParagraph>
						<Trans
							i18nKey="members.helper"
							values={{ ambassadorMultisig }}
							components={[
								<StyledLink href={`https://etherscan.io/address/${ambassadorMultisig}`} />,
							]}
						/>
					</StyledParagraph>
				</BoxContainer>
				<BoxContainer>
					<StyledTable
						palette="primary"
						columns={memberColumns}
						data={members}
						isLoading={false}
						showPagination={false}
					/>
				</BoxContainer>
			</Page>
		</>
	);
};

export default HomePage;

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

const BoxContainer = styled(FlexDivRow)<{ first?: boolean }>`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: ${(props) => (props.first ? '120px auto 20px auto' : '40px auto 20px auto')};
	padding: 0px 16px;
`;

const HeroContainer = styled(FlexDivCol)`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: 120px auto 20px auto;
	padding: 0px 16px;
`;

const Hero = styled.div`
	font-size: 40px;
	font-family: ${(props) => props.theme.fonts.expanded};
	color: ${(props) => props.theme.colors.white};
	text-transform: uppercase;
	margin-bottom: 16px;

	@media only screen and (max-width: 1020px) {
		font-size: 32px;
	}
`;

const SvgContainer = styled(FlexDivCentered)`
	width: 100%;
	align-items: center;
	margin: 48px auto;
	padding: 48px 0px;
`;

const HeroSvg = styled(Svg)`
	@media only screen and (min-width: 1440px) {
		display: none;
	}
`;

const StyledTable = styled(Table)`
	width: 100%;

	.table-body-cell {
		height: 40px;
	}
	.table-body-cell,
	.table-header-cell {
		&:last-child {
		}
	}
`;

const StyledParagraph = styled(Paragraph)`
	font-size: 14px;
	font-family: ${(props) => props.theme.fonts.regular};
	color: ${(props) => props.theme.colors.white};
	text-transform: none;
	line-height: 20px;
`;

const StyledExternalIcon = styled(ExternalLink)``;

const StyledAddressRow = styled(FlexDivRow)`
	justify-content: space-between;
	width: 100%;
`;
