import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { useTheme } from 'styled-components';
import { Svg } from 'react-optimized-image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Header from 'components/Header';
import { Trans, useTranslation } from 'react-i18next';

import {
	Divider,
	ExternalLink,
	FlexDivCentered,
	FlexDivCol,
	FlexDivRow,
	GradientCard,
	GridDiv,
	IconButton,
	StyledLink,
} from 'styles/common';
import { MAX_PAGE_WIDTH } from 'styles/constants';

import { PieChart, Pie, Label, Cell, CellProps } from 'recharts';

import CopyIcon from 'assets/svg/copy.svg';
import CheckIcon from 'assets/svg/check.svg';
import CrossIcon from 'assets/svg/cross.svg';
import Button from 'components/Button';

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

	const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

	const { ticker } = router.query;

	const COLORS = [theme.colors.blueHover, 'rgba(255, 255, 255, 0.24)'];

	const multisigAddress = '0xDEAf1d7775D198Dfa5eD9f1df7FA664cFDA920F6';
	const ens = 'snxambassador.eth';
	const votes = 120;
	const numOfDelegators = 123;
	const contractLink = `https://etherscan.io/address/${multisigAddress}#code`;

	useEffect(() => {
		if (copiedAddress) {
			setTimeout(() => {
				setCopiedAddress(false);
			}, 2000);
		}
	}, [copiedAddress]);

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
								fontFamily={theme.fonts.expanded}
								fill={theme.colors.white}
							/>
						</Pie>
					</PieChart>
					<MultisigValue>{ens}</MultisigValue>
					<AddressRow>
						<p>{multisigAddress}</p>
						<CopyToClipboard text={multisigAddress} onCopy={() => setCopiedAddress(true)}>
							{copiedAddress ? (
								<Svg
									src={CheckIcon}
									width="16"
									height="16"
									viewBox={`0 0 ${CheckIcon.width} ${CheckIcon.height}`}
								/>
							) : (
								<Svg src={CopyIcon} />
							)}
						</CopyToClipboard>
					</AddressRow>
					<StatsRow>
						<>
							<p>
								{votes}
								<span>{t('protocol.stats.votes')}</span>
							</p>
						</>
						<>
							<p>
								{numOfDelegators}
								<span>{t('protocol.stats.delegators')}</span>
							</p>
						</>
					</StatsRow>
					<Divider />
					<WithdrawRow>
						<WithdrawText>{t('protocol.withdraw.title')}</WithdrawText>
						<WithdrawButton>
							<Svg src={CrossIcon} />

							{t('protocol.withdraw.button')}
						</WithdrawButton>
					</WithdrawRow>
				</StyledCard>
				<StyledCard>
					<Subtitle>{t('protocol.options')}</Subtitle>
					<Block>
						<BlockTitle>{t('protocol.delegate.direct.title')}</BlockTitle>
						<BlockDescription>
							<Trans
								i18nKey="protocol.delegate.direct.description"
								values={{ ticker }}
								components={[<StyledLink href={contractLink} />]}
							/>
							{/* {t('protocol.delegate.direct.description', { ticker: ticker })} */}
						</BlockDescription>
						<BlockButton variant="primary">{t('protocol.delegate.direct.button')}</BlockButton>
					</Block>
					<Block>
						<BlockTitle>{t('protocol.delegate.sig.title')}</BlockTitle>
						<BlockDescription>{t('protocol.delegate.sig.description')}</BlockDescription>
						<BlockHelper>{t('protocol.delegate.sig.helper')}</BlockHelper>
						<BlockButton variant="primary">{t('protocol.delegate.sig.button')}</BlockButton>
					</Block>
				</StyledCard>
			</BoxContainer>
		</>
	);
};

export default Protocol;

const BoxContainer = styled(GridDiv)<{ first?: boolean }>`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: ${(props) => (props.first ? '120px auto 20px auto' : '40px auto 20px auto')};

	grid-template-columns: 50% 50%;
	grid-column-gap: 20px;
`;

const StyledCard = styled(GradientCard)``;

const Subtitle = styled.div`
	color: ${(props) => props.theme.colors.white};
	font-family: ${(props) => props.theme.fonts.expanded};
	font-size: 12px;
	margin-top: 8px;
	line-height: 120%;
	text-transform: uppercase;
	margin-bottom: 16px;
`;

const MultisigValue = styled.div`
	font-family: ${(props) => props.theme.fonts.regular};
	font-weight: bold;
	font-size: 20px;
	width: 100%;
	text-align: left;
	margin-bottom: 4px;

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
		cursor: pointer;
	}
`;

const StatsRow = styled(FlexDivRow)`
	font-size: 14px;
	font-family: ${(props) => props.theme.fonts.regular};
	width: 100%;
	justify-content: flex-start;

	p {
		font-weight: 700;
		margin-right: 16px;
		text-transform: none;
	}

	span {
		margin-left: 6px;
		font-weight: 400;
	}
`;

const WithdrawRow = styled(FlexDivRow)`
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 16px 0px;
`;

const WithdrawText = styled.div`
	font-family: ${(props) => props.theme.fonts.regular};
	font-size: 14px;
	text-transform: capitalize;
	color: ${(props) => props.theme.colors.gray};
`;

const WithdrawButton = styled(IconButton)`
	display: flex;
	flex-direction: row;
	align-items: center;
	text-transform: uppercase;
	color: ${(props) => props.theme.colors.blue};
	font-size: 14px;
	font-family: ${(props) => props.theme.fonts.condensedBold};

	svg {
		margin-right: 4px;
	}
`;

const Block = styled(FlexDivCol)`
	width: 100%;
	padding-bottom: 16px;
	div {
		margin: 8px 0px;
	}
`;

const BlockTitle = styled.div`
	font-family: ${(props) => props.theme.fonts.condensedBold};
	font-size: 14px;
	color: ${(props) => props.theme.colors.white};
	text-transform: uppercase;
`;

const BlockDescription = styled.div`
	font-family: ${(props) => props.theme.fonts.regular};
	font-size: 14px;
	color: ${(props) => props.theme.colors.white};
`;

const BlockButton = styled(Button)`
	margin: 16px 0px;
	text-transform: uppercase;
`;

const BlockHelper = styled.div`
	font-family: ${(props) => props.theme.fonts.regular};
	font-size: 12px;
	color: ${(props) => props.theme.colors.gray};
	text-align: center;
`;
