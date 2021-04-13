import React from 'react';
import styled from 'styled-components';
import { FlexDivRow, FlexDivCol, GradientCard } from 'styles/common';
import { Token } from 'queries/tokenLists/types';
import { Svg } from 'react-optimized-image';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import ViewIcon from 'assets/svg/view-eye.svg';
import Link from 'next/link';
import ROUTES from 'constants/routes';

interface ProtocolBoxProps {
	tokenInfo: Token;
	votingPower: string;
	delegated: string;
}

const ProtocolBox: React.FC<ProtocolBoxProps> = ({ tokenInfo, votingPower, delegated }) => {
	const { t } = useTranslation();
	return (
		<Container>
			<Icon src={tokenInfo.logoURI} />
			<Title>{tokenInfo.name}</Title>
			<Ticker>{tokenInfo.symbol}</Ticker>
			<DataRow>
				<DataCol rightSide={false}>
					<p>{t('delegation.box.power')}</p>
					<span>{votingPower}</span>
				</DataCol>
				<DataCol rightSide={true}>
					<p>{t('delegation.box.delegated')}</p>
					<span>{delegated}</span>
				</DataCol>
			</DataRow>
			<Link href={ROUTES.Protocol(tokenInfo.symbol)}>
				<ViewButton variant="text">
					<Svg src={ViewIcon} />
					View protocol
				</ViewButton>
			</Link>
		</Container>
	);
};

export default ProtocolBox;

const Container = styled(GradientCard)``;

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
	opacity: 0.7;
`;

const DataRow = styled(FlexDivRow)`
	width: 100%;
`;

const DataCol = styled(FlexDivCol)<{ rightSide: boolean }>`
	width: 50%;
	text-align: center;
	text-transform: uppercase;
	border-top: 1px solid ${(props: any) => props.theme.colors.border};
	border-bottom: 1px solid ${(props: any) => props.theme.colors.border};
	border-right: ${(props) =>
		props.rightSide
			? `1px solid ${props.theme.colors.border}`
			: `0.5px solid ${props.theme.colors.border}`};
	border-left: ${(props) =>
		props.rightSide
			? `0.5px solid ${props.theme.colors.border}`
			: `1px solid ${props.theme.colors.border}`};

	padding: 8px;

	p {
		font-family: ${(props) => props.theme.fonts.condensedBold};
		font-size: 14px;
		color: ${(props) => props.theme.colors.gray};
		margin: 0;
	}

	span {
		font-family: ${(props) => props.theme.fonts.expanded};
		font-size: 12px;
		color: ${(props) => props.theme.colors.white};
		margin: 0;
	}
`;

const ViewButton = styled(Button)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	color: ${(props) => props.theme.colors.blue};
	text-transform: uppercase;
	font-size: 12px;

	margin: 16px 0px;

	svg {
		margin-right: 8px;
	}
`;
