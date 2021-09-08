import React, { useMemo } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';
import {
	FlexDivRow,
	Paragraph,
	FlexDivCol,
	FlexDivCentered,
	ExternalLink,
	StyledLink,
} from 'styles/common';
import { MAX_PAGE_WIDTH } from 'styles/constants';
import { Svg } from 'react-optimized-image';
import HeroGraphic from 'assets/svg/hero.svg';
import Table from 'components/Table';
import { members, ambassadorMultisig } from 'constants/ambassadorMultisig';
import { ethers } from 'ethers';
import { CellProps } from 'react-table';
import LinkIcon from 'assets/svg/link-blue.svg';
import Header from 'components/Header';

const HomePage: React.FC = () => {
	const { t } = useTranslation();

	const memberColumns = useMemo(() => {
		const columns = [
			{
				Header: <>{t('home.members.table.name')}</>,
				accessor: 'name',
				Cell: (cellProps: CellProps<any>) => {
					return <StyledParagraph>{cellProps.value}</StyledParagraph>;
				},

				sortable: false,
				width: 600,
			},
			{
				Header: <>{t('home.members.table.address')}</>,
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
				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
					crossOrigin="anonymous"
				/>
			</Head>
			<Page>
				<HeroContainer>
					<Hero>{t('home.hero')}</Hero>
					{/* <StyledParagraph>{t('home.sub-hero')}</StyledParagraph> */}
				</HeroContainer>
				<SvgContainer>
					<HeroSvg src={HeroGraphic} />
				</SvgContainer>
				<Header title={t('home.responsibilities.title')} />
				<BoxContainer>
					<StyledParagraph>
						The Synthetix Ambassadors is a governing body of the Synthetix Protocol, it is the body
						that is responsible for ecosystem governance, partnerships and ecosystem governance. To
						learn more about the Synthetix Ambassadors, their mandate is outlined{' '}
						<a rel="noreferrer" target="_blank" href="https://sips.synthetix.io/sips/sip-157">
							here.
						</a>
					</StyledParagraph>
				</BoxContainer>
				<Header title={t('home.members.title')} />
				<BoxContainer>
					<StyledParagraph>
						<Trans
							i18nKey="home.members.helper"
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
	width: 100%;
`;

const StyledParagraph = styled(Paragraph)`
	font-size: 14px;
	font-family: ${(props) => props.theme.fonts.regular};
	color: ${(props) => props.theme.colors.white};
	text-transform: none;
	line-height: 20px;
`;

const BoxContainer = styled(FlexDivRow)<{ first?: boolean }>`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: ${(props) => (props.first ? '120px auto 20px auto' : '40px auto 20px auto')};
	padding: 0px 16px;
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

const StyledExternalIcon = styled(ExternalLink)``;

const StyledAddressRow = styled(FlexDivRow)`
	justify-content: space-between;
	width: 100%;
`;
