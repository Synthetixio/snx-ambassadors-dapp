import React, { useMemo } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Header from 'components/Header';
import { useTranslation } from 'react-i18next';
import { FlexDivRow } from 'styles/common';
import Box from 'components/Box';
import useTokenList from 'queries/tokenLists/useTokenLists';
import { MAX_PAGE_WIDTH } from 'styles/constants';
import Table from 'components/Table';
import { CellProps } from 'react-table';

const HomePage: React.FC = () => {
	const { t } = useTranslation();
	const tokenListQuery = useTokenList();
	const tokenList = useMemo(() => (tokenListQuery.isSuccess ? tokenListQuery.data ?? null : null), [
		tokenListQuery.isSuccess,
		tokenListQuery.data,
	]);

	const SUPPORTED_PROTOCOLS = ['UNI', 'COMP', 'AAVE'];

	const memberColumns = useMemo(() => {
		const columns = [
			{
				Header: <>{t('members.table.name')}</>,
				accessor: 'name',
				Cell: (cellProps: CellProps<any>) => {
					return <>{cellProps.value}</>;
				},

				sortable: false,
			},
			{
				Header: <>{t('members.table.address')}</>,
				accessor: 'address',
				Cell: (cellProps: CellProps<any>) => {
					return <>{cellProps.value}</>;
				},

				sortable: false,
			},
		];

		return columns;
	}, [t]);

	const data = [];

	return (
		<>
			<Head>
				<title>Ambassadors</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<>
				<Header title={t('delegation.title')} first />
				<BoxContainer>
					{SUPPORTED_PROTOCOLS.map((symbol, i) => {
						if (tokenList) {
							return (
								<>
									<Box key={i} tokenInfo={tokenList[symbol]} votingPower={'0'} delegated={'0'} />
								</>
							);
						} else return <></>;
					})}
				</BoxContainer>
				<Header title={t('members.title')} />
				<BoxContainer>
					<StyledTable
						palette="primary"
						columns={memberColumns}
						data={[]}
						isLoading={false}
						showPagination={false}
					/>
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

const StyledTable = styled(Table)`
	padding: 0 10px;

	width: 100%;

	.table-body-cell {
		height: 40px;
	}
	.table-body-cell,
	.table-header-cell {
		&:last-child {
			justify-content: flex-end;
		}
	}
`;
