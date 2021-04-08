import React from 'react';
import styled from 'styled-components';
import { FlexDivRow, FlexDivCol } from 'styles/common';
import { Token } from 'queries/tokenLists/types';
import { useTranslation } from 'react-i18next';

interface DelegationBoxProps {
	tokenInfo: Token;
	votingPower: string;
	delegated: string;
}

const DelegationBox: React.FC<DelegationBoxProps> = ({ tokenInfo, votingPower, delegated }) => {
	const { t } = useTranslation();
	return (
		<Box>
			<Icon src={tokenInfo.logoURI} />
			<Title>{tokenInfo.name}</Title>
			<Ticker>{tokenInfo.symbol}</Ticker>
			<DataRow>
				<DataCol>
					<p>{t('delegation.box.power')}</p>
					<span>{votingPower}</span>
				</DataCol>
				<DataCol right>
					<p>{t('delegation.box.delegated')}</p>
					<span>{delegated}</span>
				</DataCol>
			</DataRow>
		</Box>
	);
};

export default DelegationBox;

const Box = styled(FlexDivCol)`
	margin-top: 20px;
	padding: 20px;
	background: ${(props) => props.theme.colors.mediumBlue};
	opacity: 0.8;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
	width: 33%;
	justify-content: center;
	align-items: center;

	margin: 0px 16px;

	@media only screen and (max-width: 1015px) {
		width: 45%;
	}
	@media only screen and (max-width: 854px) {
		width: 100%;
	}
`;

const Icon = styled.img`
	width: 150px;
	height: auto;
	padding: 16px;
`;

const Title = styled.div`
	font-family: ${(props) => props.theme.fonts.expanded};
	color: ${(props) => props.theme.colors.white};
	font-size: 16px;
	line-height: 24px;
	text-transform: uppercase;
	text-align: center;
	margin-top: 16px;

	@media only screen and (max-width: 500px) {
		margin-bottom: 25px;
	}
`;

const Ticker = styled.div`
	font-family: ${(props) => props.theme.fonts.regular};
	color: ${(props) => props.theme.colors.white};
	font-size: 12px;
	text-align: center;
	margin-bottom: 16px;
`;

const DataRow = styled(FlexDivRow)`
	border: 1px solid ${(props) => props.theme.colors.gray};
	width: 100%;
`;

const DataCol = styled(FlexDivCol)<{ right?: boolean }>`
	width: 50%;
	text-align: center;
	text-transform: uppercase;
	border: 1px solid ${(props: any) => props.theme.colors.gray};
	padding: 8px;

	p {
		font-family: ${(props) => props.theme.fonts.condensedBold};
		font-size: 14px;
		color: ${(props) => props.theme.colors.lightFont};
	}

	span {
		font-family: ${(props) => props.theme.fonts.expanded};
		font-size: 12px;
		color: ${(props) => props.theme.colors.white};
	}
`;
