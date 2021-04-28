import React, { useMemo } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Header from 'components/Header';
import { Trans, useTranslation } from 'react-i18next';
import { FlexDivRow, Paragraph, GridDiv, StyledLink, ExternalLink } from 'styles/common';
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
				<title>Ambassadors</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<>
				<Header title={t('ambassadors.title')} first />
				<BoxContainer>
					<StyledParagraph>{t('ambassadors.description')}</StyledParagraph>
				</BoxContainer>
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
			</>
		</>
	);
};

export default HomePage;

const StyledGrid = styled(GridDiv)`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: 0 auto;
	column-gap: 16px;
	grid-template-columns: auto auto auto;
`;

const BoxContainer = styled(FlexDivRow)<{ first?: boolean }>`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: ${(props) => (props.first ? '120px auto 20px auto' : '40px auto 20px auto')};
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
`;

const StyledExternalIcon = styled(ExternalLink)``;

const StyledAddressRow = styled(FlexDivRow)`
	justify-content: space-between;
	width: 100%;
`;
