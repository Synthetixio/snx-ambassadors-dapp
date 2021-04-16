import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { useTheme } from 'styled-components';
import { Svg } from 'react-optimized-image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Header from 'components/Header';
import { Trans, useTranslation } from 'react-i18next';
import Button from 'components/Button';

import {
	Divider,
	FlexDivCentered,
	FlexDivCol,
	FlexDivRow,
	GradientCard,
	GridDiv,
	IconButton,
	StyledLink,
} from 'styles/common';
import { MAX_PAGE_WIDTH } from 'styles/constants';
import { handleStatusColor } from 'styles/status';

import { PieChart, Pie, Label, Cell } from 'recharts';

import CopyIcon from 'assets/svg/copy.svg';
import CheckIcon from 'assets/svg/check.svg';
import CrossIcon from 'assets/svg/cross.svg';
import FailureIcon from 'assets/svg/failure.svg';
import SuccessIcon from 'assets/svg/success.svg';
import { protocols, protocolsBySymbol, SupportedProtocol } from 'constants/protocols';

const VOTING_WEIGHT = 0.6;

interface ProposalDetail {
	target: string;
	functionSig: string;
	callData: string;
}

export interface ProposalData {
	id: string;
	title: string;
	description: string;
	proposer: string;
	status: string;
	forCount: number | undefined;
	againstCount: number | undefined;
	startBlock: number;
	endBlock: number;
	details: ProposalDetail[];
	forVotes: {
		support: boolean;
		votes: string;
		voter: {
			id: string;
		};
	}[];
	againstVotes: {
		support: boolean;
		votes: string;
		voter: {
			id: string;
		};
	}[];
}

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

	const { ticker }: any = router.query;

	const COLORS = [theme.colors.blueHover, 'rgba(255, 255, 255, 0.24)'];

	const multisigAddress = '0xDEAf1d7775D198Dfa5eD9f1df7FA664cFDA920F6';
	const ens = 'snxambassador.eth';
	const votes = 120;
	const numOfDelegators = 123;
	const contractLink = `https://etherscan.io/address/${multisigAddress}#code`;

	const proposals: ProposalData[] = [
		{
			againstVotes: [],
			title: 'Exit LBP & add Uniswap liquidity',
			description:
				'# Exit LBP & add Uniswap liquidity\n\nThis is a proposal to complete the LBP event by exiting the pool. To maintain\na liquid market, 4M USDC and 400K RAD are added to a Uniswap trading pair.\n\nIf executed, this proposal will:\n\n1. Remove liquidity from the LBP, by swapping the RADP pool tokens for the underlying assets (RAD and USDC)\n2. Return the 3.5M USDC loan to the Radicle Foundation\n3. Approve Uniswap router proxy for 5M USDC\n4. Approve Uniswap router proxy for 500K RAD\n5. Add liquidity to Uniswap RAD/USDC pair via the Uniswap router\n\nAfter execution, the Timelock holds all Uniswap LP tokens for the RAD/USDC pair.\n\nTo prevent front-running, the RAD/USDC balances are set through the Uniswap\nrouter *proxy* contract, deployed at `0xB76FC4EbE4fC0CC34AF440Ad79565A68Bfcb095e`.\nOnly the Radicle Foundation can set these balances, via the `setLiquidity`\nfunction. This contract function must be called as close as possible to the\nexecution of this proposal, to provide liquidity at the correct market price.\n\n## Notes\n\n* For this proposal to go through, the LBP must have at least 1M RAD and 20M USDC.\n* `0x750dD34Fb165bE682fAe445793AB9ab9729CDAa3` is the CRP Pool.\n* `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` is the USDC contract.\n* `0x31c8EAcBFFdD875c74b94b077895Bd78CF1E64A3` is the RAD contract.\n* `0x055E29502153aEDcFDaE8Fc15a710FF6fb5e10C9` is the Radicle Foundation address.\n* `0xB76FC4EbE4fC0CC34AF440Ad79565A68Bfcb095e` is the Uniswap router proxy contract.',
			forVotes: [],
			id: '4',
			proposer: '0x2f0963e77ca6ac0c2dad1bf4147b6b40e0dd8728',
			signatures: [
				'exitPool(uint256,uint256[])',
				'transfer(address,uint256)',
				'approve(address,uint256)',
				'approve(address,uint256)',
				'addLiquidity(address,address)',
			],
			status: 'executed',
			targets: [
				'0x750dd34fb165be682fae445793ab9ab9729cdaa3',
				'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
				'0x31c8eacbffdd875c74b94b077895bd78cf1e64a3',
				'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
				'0xb76fc4ebe4fc0cc34af440ad79565a68bfcb095e',
			],
			values: ['0', '0', '0', '0', '0'],
		},
	];

	useEffect(() => {
		if (copiedAddress) {
			setTimeout(() => {
				setCopiedAddress(false);
			}, 2000);
		}
	}, [copiedAddress]);

	return (
		<>
			<Header
				title={t('protocol.delegate.title', { ticker: ticker })}
				first={true}
				back={true}
				protocol={protocols.filter((protocol) => protocol.symbol === SupportedProtocol[ticker])[0]}
			/>
			<BoxContainer>
				<StyledCard>
					<Subtitle>{t('protocol.delegate.vote-weight')}</Subtitle>
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
								<span>{t('protocol.delegate.stats.votes')}</span>
							</p>
						</>
						<>
							<p>
								{numOfDelegators}
								<span>{t('protocol.delegate.stats.delegators')}</span>
							</p>
						</>
					</StatsRow>
					<Divider />

					<StatusRow>
						<p>Avaliable votes: 103 </p>
						<p>Status: 103 delegated</p>
					</StatusRow>

					<WithdrawRow>
						<WithdrawText>{t('protocol.delegate.withdraw.title')}</WithdrawText>
						<WithdrawButton>
							<Svg src={CrossIcon} />

							{t('protocol.delegate.withdraw.button')}
						</WithdrawButton>
					</WithdrawRow>
				</StyledCard>
				<StyledCard>
					<Subtitle>{t('protocol.delegate.options')}</Subtitle>
					<Block>
						<BlockTitle>{t('protocol.delegate.direct.title')}</BlockTitle>
						<BlockDescription>
							<Trans
								i18nKey="protocol.delegate.direct.description"
								values={{ ticker }}
								components={[<StyledLink href={contractLink} />]}
							/>
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
			<Header title={t('protocol.activity.title')} />
			<BoxContainer>
				<ProposalContainer>
					{proposals.map((proposal, i) => {
						const favour = true;
						const voteCount = 1231232;
						return (
							<ProposalRow key={i}>
								<ProposalLeft>
									<p>{proposal.title}</p>
									<StatusLabel status={proposal.status}>{proposal.status}</StatusLabel>
								</ProposalLeft>
								<ProposalRight>
									<p>
										Assigned {voteCount} votes {favour ? 'in favour' : 'against'}
									</p>
									{favour ? <Svg src={SuccessIcon} /> : <Svg src={FailureIcon} />}
								</ProposalRight>
							</ProposalRow>
						);
					})}
				</ProposalContainer>
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

const StatusRow = styled(FlexDivRow)`
	width: 100%;
	justify-content: flex-start;

	p {
	}
`;

const ProposalContainer = styled(GradientCard)`
	grid-column: 1 / 3;
`;

const ProposalRow = styled(FlexDivRow)`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	padding-bottom: 16px;
	border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

const StatusLabel = styled.div<{ status: string }>`
	font-size: 12px;
	font-weight: 600;
	padding: 0.25rem;
	border-radius: 8px;
	color: ${({ status, theme }) => handleStatusColor(status, theme)};
	border: 1px solid ${({ status, theme }) => handleStatusColor(status, theme)};
	width: fit-content;
	text-transform: uppercase;
	margin-top: 16px;
	font-family: ${(props) => props.theme.fonts.interSemiBold};
`;

const ProposalLeft = styled(FlexDivCol)`
	p {
		margin: 0;
		font-family: ${(props) => props.theme.fonts.regular};
		font-size: 14px;
	}
`;

const ProposalRight = styled(FlexDivRow)`
	align-items: center;
	p {
		margin: 0;
		font-family: ${(props) => props.theme.fonts.interBold};
		font-size: 14px;
	}
	svg {
		transform: scale(0.4);
	}
`;
