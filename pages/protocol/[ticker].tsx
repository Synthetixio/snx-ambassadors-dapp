import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { useTheme } from 'styled-components';
import { Svg } from 'react-optimized-image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Header from 'components/Header';
import { Trans, useTranslation } from 'react-i18next';
import Button from 'components/Button';
import { ethers } from 'ethers';

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
import SpinnerIcon from 'assets/svg/loader.svg';

import { SupportedProtocol, protocols, protocolsBySymbol } from 'constants/protocols';
import { formatNumber, formatPercent } from 'utils/formatters/number';
import { ambassadorMultisig, ambassadorENS } from 'constants/ambassadorMultisig';
import { useProtocolGlobalDataQuery, GlobalData } from 'queries/useProtocolGlobalDataQuery';
import { DelegateInfo, useDelegateInfoQuery } from 'queries/useDelegateInfoQuery';
import { useDelegatorInfoQuery } from 'queries/useDelegatorInfoQuery';
import { useRecoilValue } from 'recoil';
import { isWalletConnectedState, walletAddressState } from 'store/wallet';
import { Proposal, useProtocolProposals } from 'queries/useProposals';
import UNIToken from 'contracts/UNI';
import AAVEToken from 'contracts/AAVE';
import { normalizedGasPrice } from 'utils/network';
import TransactionNotifier from 'containers/TransactionNotifier';
import Connector from 'containers/Connector';

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

const Protocol: React.FC = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const theme = useTheme();
	const { ticker } = router.query;

	const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
	const walletAddress = useRecoilValue(walletAddressState);
	const isWalletConnected = useRecoilValue(isWalletConnectedState);

	const { monitorTransaction } = TransactionNotifier.useContainer();
	const { signer } = Connector.useContainer();

	const [error, setError] = useState<string | null>('');

	const [txHash, setTxHash] = useState<string | null>(null);

	const protocolTicker = ticker as SupportedProtocol;

	const protocolObj = protocolsBySymbol();

	const delegateInfo = useDelegateInfoQuery(SupportedProtocol[protocolTicker]);
	const delegatorInfo = useDelegatorInfoQuery(SupportedProtocol[protocolTicker]);
	const globalInfo = useProtocolGlobalDataQuery(SupportedProtocol[protocolTicker]);
	const proposals = useProtocolProposals(SupportedProtocol[protocolTicker]);

	useEffect(() => {
		if (copiedAddress) {
			setTimeout(() => {
				setCopiedAddress(false);
			}, 2000);
		}
	}, [copiedAddress]);

	const handleDelegate = useCallback(async () => {
		async function delegate() {
			if (signer) {
				try {
					setError(null);

					let contract: ethers.Contract;

					if (protocolTicker === SupportedProtocol.AAVE) {
						contract = new ethers.Contract(
							protocolObj[protocolTicker].address,
							AAVEToken.abi,
							signer
						);
					} else {
						contract = new ethers.Contract(
							protocolObj[protocolTicker].address,
							UNIToken.abi,
							signer
						);
					}

					const gasLimit = await contract.estimateGas.delegate(ambassadorMultisig);

					let transaction = await contract.delegate(ambassadorMultisig, {
						gasLimit,
					});

					if (transaction) {
						setTxHash(transaction.hash);
						// setTransactionState(Transaction.WAITING);
						monitorTransaction({
							txHash: transaction.hash,
							// onTxConfirmed: () => setTransactionState(Transaction.SUCCESS),
						});
						// setTxModalOpen(false);
					}
				} catch (e) {
					console.log(e);
					// setTransactionState(Transaction.PRESUBMIT);
					setError(e.message);
				}
			}
		}
		delegate();
	}, [monitorTransaction, protocolObj, protocolTicker]);

	const returnPieChart = (delegate: DelegateInfo, global: GlobalData) => {
		const COLORS = [theme.colors.blueHover, 'rgba(255, 255, 255, 0.24)'];

		const data = [
			{
				name: 'Global weight',
				value: delegate.delegatedVotes / global.delegatedVotes,
			},
			{
				name: 'Weight owned by delegate',
				value: 1 - delegate.delegatedVotes / global.delegatedVotes,
			},
		];

		const percentage = formatPercent(delegate.delegatedVotes / global.delegatedVotes);

		return (
			<PieChart width={250} height={250}>
				<Pie
					data={data}
					dataKey="value"
					nameKey="name"
					innerRadius={80}
					outerRadius={100}
					fill={theme.colors.blue}
				>
					{data.map((_, index: number) => (
						<Cell key={`cell-${index}`} fill={COLORS[index]} stroke="none" />
					))}
					<Label
						value={`${percentage}`}
						position="center"
						fontSize={22}
						fontFamily={theme.fonts.expanded}
						fill={theme.colors.white}
					/>
				</Pie>
			</PieChart>
		);
	};

	const returnProposals = (proposals: Proposal[], delegateInfo: DelegateInfo) => {
		let validProposals = [] as any;

		delegateInfo.votes.forEach((vote) => {
			proposals.forEach((proposal) => {
				if (vote.proposal === parseInt(proposal.id)) {
					validProposals.push({
						proposalInfo: {
							...proposal,
						},
						delegateVote: {
							...vote,
						},
					});
				}
			});
		});

		if (validProposals.length > 0) {
			return validProposals.map((proposal: any, i: number) => {
				return (
					<ProposalRow key={i}>
						<ProposalLeft>
							<p>{proposal.proposalInfo.description.split(/# |\n/g)[1] || 'Untitled'}</p>
							<StatusLabel status={proposal.proposalInfo.status.toLowerCase()}>
								{proposal.proposalInfo.status}
							</StatusLabel>
						</ProposalLeft>
						<ProposalRight>
							<p>
								Assigned {formatNumber(proposal.delegateVote.votes)} votes{' '}
								{proposal.delegateVote.support ? 'in favour' : 'against'}
							</p>
							{proposal.delegateVote.support ? (
								<Svg src={SuccessIcon} />
							) : (
								<Svg src={FailureIcon} />
							)}
						</ProposalRight>
					</ProposalRow>
				);
			});
		} else {
			// @TOOD add empty state here
			return <p>Empty</p>;
		}
	};

	return (
		<>
			<Header
				title={t('protocol.delegate.title', { ticker: protocolTicker })}
				first={true}
				back={true}
				protocol={
					protocols.filter((protocol) => protocol.symbol === SupportedProtocol[protocolTicker])[0]
				}
			/>
			<BoxContainer>
				<StyledCard>
					{!delegateInfo.isLoading && !globalInfo.isLoading ? (
						delegateInfo.data && globalInfo.data ? (
							<>
								<Subtitle>{t('protocol.delegate.vote-weight')}</Subtitle>
								{returnPieChart(delegateInfo.data, globalInfo.data)}
								<MultisigValue>{ambassadorENS}</MultisigValue>
								<AddressRow>
									<p>{ambassadorMultisig}</p>
									<CopyToClipboard text={ambassadorMultisig} onCopy={() => setCopiedAddress(true)}>
										{copiedAddress ? (
											<Svg
												src={CheckIcon}
												width="16"
												height="16"
												viewBox={`0 0 ${CheckIcon.width} ${CheckIcon.height}`}
											/>
										) : (
											<Svg
												width="16"
												height="16"
												viewBox={`0 0 ${CopyIcon.width} ${CopyIcon.height}`}
												src={CopyIcon}
											/>
										)}
									</CopyToClipboard>
								</AddressRow>
								<StatsRow>
									<>
										<p>
											{formatNumber(delegateInfo.data.delegatedVotes)}
											<span>{t('protocol.delegate.stats.votes')}</span>
										</p>
									</>
									<>
										<p>
											{formatNumber(delegateInfo.data.tokenHoldersRepresentedAmount)}
											<span>{t('protocol.delegate.stats.delegators')}</span>
										</p>
									</>
								</StatsRow>
								<StyledDivider />

								{isWalletConnected && walletAddress && delegateInfo.data ? (
									<>
										<AddressRow>
											<p>{ethers.utils.getAddress(walletAddress)}</p>
											<CopyToClipboard text={walletAddress} onCopy={() => setCopiedAddress(true)}>
												{copiedAddress ? (
													<Svg
														src={CheckIcon}
														width="16"
														height="16"
														viewBox={`0 0 ${CheckIcon.width} ${CheckIcon.height}`}
													/>
												) : (
													<Svg
														width="16"
														height="16"
														viewBox={`0 0 ${CopyIcon.width} ${CopyIcon.height}`}
														src={CopyIcon}
													/>
												)}
											</CopyToClipboard>
										</AddressRow>
										<StatsRow>
											<p>
												{t('protocol.delegate.user.available')}:
												<span>{formatNumber(delegatorInfo.data ?? 0)}</span>
											</p>
											<p>
												{t('protocol.delegate.user.status')}:
												<span>
													{delegatorInfo.data === 0
														? t('protocol.delegate.user.not-delegated')
														: t('protocol.delegate.user.delegated')}
												</span>
											</p>
										</StatsRow>
									</>
								) : (
									<AddressRow>
										<p>Connect Wallet</p>
									</AddressRow>
								)}
								{delegatorInfo.data !== 0 && (
									<>
										<WithdrawRow>
											<WithdrawText>{t('protocol.delegate.withdraw.title')}</WithdrawText>
											<WithdrawButton>
												<Svg src={CrossIcon} />
												{t('protocol.delegate.withdraw.button')}
											</WithdrawButton>
										</WithdrawRow>
										<RowHelper>{t('protocol.delegate.withdraw.helper')}</RowHelper>
									</>
								)}
							</>
						) : (
							<StyledSpinner src={SpinnerIcon} />
						)
					) : (
						<StyledSpinner src={SpinnerIcon} />
					)}
				</StyledCard>
				<StyledCard>
					<Subtitle>{t('protocol.delegate.options')}</Subtitle>
					<Block>
						<BlockTitle>{t('protocol.delegate.direct.title')}</BlockTitle>
						<BlockDescription>
							<Trans
								i18nKey="protocol.delegate.direct.description"
								values={{ ticker }}
								components={[
									<StyledLink
										href={
											protocolTicker
												? `https://etherscan.io/address/${protocolObj[protocolTicker].address}#code`
												: ''
										}
									/>,
								]}
							/>
						</BlockDescription>
						<BlockButton onClick={() => handleDelegate()} variant="primary">
							{t('protocol.delegate.direct.button')}
						</BlockButton>
					</Block>
					{/* <Block>
						<BlockTitle>{t('protocol.delegate.sig.title')}</BlockTitle>
						<BlockDescription>{t('protocol.delegate.sig.description')}</BlockDescription>
						<BlockHelper>{t('protocol.delegate.sig.helper')}</BlockHelper>
						<BlockButton variant="primary">{t('protocol.delegate.sig.button')}</BlockButton>
					</Block> */}
				</StyledCard>
			</BoxContainer>
			<Header title={t('protocol.activity.title')} />
			<BoxContainer>
				<ProposalContainer>
					{!proposals.isLoading ? (
						proposals.data &&
						delegateInfo.data &&
						returnProposals(proposals.data, delegateInfo.data)
					) : (
						<StyledSpinner src={SpinnerIcon} />
					)}
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

const RowHelper = styled.div`
	font-family: ${(props) => props.theme.fonts.regular};
	font-size: 12px;
	color: ${(props) => props.theme.colors.gray};
	text-align: left;
	width: 100%;
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
	padding-top: 16px;
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

const StyledSpinner = styled(Svg)`
	display: block;
	margin: 30px auto;
`;

const StyledDivider = styled(Divider)`
	margin-bottom: 16px;
`;
