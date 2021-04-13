import React from 'react';
import { useRouter } from 'next/router';
import styled, { useTheme } from 'styled-components';
import Header from 'components/Header';
import { FlexDivCentered, FlexDivRow, GradientCard, GridDiv } from 'styles/common';
import { MAX_PAGE_WIDTH } from 'styles/constants';
import { useTranslation } from 'react-i18next';
import { Svg } from 'react-optimized-image';

import { PieChart, Pie, Label, Cell, CellProps } from 'recharts';
import CopyIcon from 'assets/svg/copy.svg';

const VOTING_WEIGHT = 0.6;

const data01 = [
	{
		name: 'Group A',
		value: VOTING_WEIGHT,
	},
	{
		name: 'Group B',
		value: 1 - VOTING_WEIGHT,
	},
];

const Protocol: React.FC = () => {
	const router = useRouter();
	const { t } = useTranslation();
	const theme = useTheme();
	const { ticker } = router.query;

	const COLORS = [theme.colors.blueHover, 'rgba(255, 255, 255, 0.24)'];

	return (
		<>
			<Header title={`DELEGATE ${ticker}`} first />
			<BoxContainer>
				<StyledCard>
					<Subtitle>{t('protocol.vote-weight')}</Subtitle>
					<PieChart width={250} height={250}>
						<Pie
							data={data01}
							dataKey="value"
							nameKey="name"
							innerRadius={80}
							outerRadius={100}
							fill={theme.colors.blue}
						>
							{data01.map((entry, index: number) => (
								<Cell key={`cell-${index}`} fill={COLORS[index]} stroke="none" />
							))}
							<Label
								value={`${VOTING_WEIGHT * 100}%`}
								position="center"
								fontSize={22}
								fill={theme.colors.white}
							/>
						</Pie>
					</PieChart>
					<MultisigValue>SynthetixAmbassadors.eth</MultisigValue>
					<AddressRow>
						<p>0xDEAf1d7775D198Dfa5eD9f1df7FA664cFDA920F6</p>
						<Svg src={CopyIcon} />
					</AddressRow>
				</StyledCard>
				<StyledCard></StyledCard>
			</BoxContainer>
		</>
	);
};

export default Protocol;

const BoxContainer = styled(GridDiv)<{ first?: boolean }>`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: ${(props) => (props.first ? '120px auto 20px auto' : '40px auto 20px auto')};
	font-size: 28px;
	line-height: 120%;
	font-family: ${(props) => `${props.theme.fonts.expanded}, ${props.theme.fonts.regular}`};
	color: ${(props) => props.theme.colors.white};
	text-transform: uppercase;
	grid-template-columns: 50% 50%;
	grid-column-gap: 20px;
`;

const StyledCard = styled(GradientCard)``;

const Subtitle = styled.div`
	color: ${(props) => props.theme.colors.white};
	font-family: ${(props) => props.theme.fonts.expanded};
	font-size: 12px;
	margin-top: 8px;
`;

const MultisigValue = styled.div`
	font-family: ${(props) => props.theme.fonts.regular};
	font-weight: bold;
	font-size: 20px;
	width: 100%;
	text-align: left;

	text-transform: capitalize;

	color: ${(props) => props.theme.colors.blue};
`;

const AddressRow = styled(FlexDivCentered)`
	width: 100%;
	text-align: left;
	align-items: center;

	p {
		font-family: ${(props) => props.theme.fonts.regular};
		font-size: 14px;
		color: ${(props) => props.theme.colors.gray};
		margin: 0;
	}

	svg {
		margin-left: 8px;
	}
`;
