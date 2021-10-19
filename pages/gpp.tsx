import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { ethers } from 'ethers';

import Connector from 'containers/Connector';

import Header from 'components/Header';
import { FlexDivCol, FlexDivRow, GradientCard, GridDiv } from 'styles/common';
import { MAX_PAGE_WIDTH } from 'styles/constants';
import { isWalletConnectedState, walletAddressState } from 'store/wallet';

import MerkleTree from 'contracts/MerkleTree';

import { merkleTreeAddress } from 'constants/merkleAddress';

import { formatNumber } from 'utils/formatters/number';
import Button from 'components/Button';
import Notify from 'containers/Notify';

import useUserClaimData from 'hooks/useUserClaimData';
import useHasClaimed from 'hooks/useHasClaimed';
import useTotalRewardsLeft from 'hooks/useTotalRewardsLeft';

const GPP: React.FC = () => {
	const { t } = useTranslation();
	const { signer, connectWallet } = Connector.useContainer();
	const { monitorHash } = Notify.useContainer();
	const walletAddress = useRecoilValue(walletAddressState);
	const isWalletConnected = useRecoilValue(isWalletConnectedState);

	const [attempting, setAttempting] = useState<boolean>(false);
	const [amount, setAmount] = useState<number>(0);
	const [index, setIndex] = useState<number | null>(null);
	const [error, setError] = useState<string | null>('');
	const [address, setAddress] = useState<string>(walletAddress ?? '');

	const claimData = useUserClaimData(address);
	const hasClaimed = useHasClaimed(index);
	const totalSupply = useTotalRewardsLeft();

	const deadlineForClaiming = new Date().getUTCDate();

	useEffect(() => {
		if (address && claimData && claimData.hasClaim) {
			setIndex(claimData.index);
		}
	}, [address, claimData]);

	useEffect(() => {
		if (claimData && claimData.amount.length > 0) {
			const amount = Number(ethers.utils.formatEther(ethers.BigNumber.from(claimData.amount)));
			setAmount(amount);
		}
	}, [claimData, address]);

	const handleClaim = useCallback(() => {
		async function claim() {
			try {
				setError(null);
				setAttempting(true);

				if (claimData && address && signer) {
					const args = [claimData.index, address, claimData.amount, claimData.proof];

					const contract = new ethers.Contract(merkleTreeAddress, MerkleTree.abi, signer as any);

					const gasLimitEstimate = await contract.estimateGas.claim(...args);

					const transaction = await contract.claim(...args, {
						gasLimit: gasLimitEstimate,
					});

					if (transaction) {
						monitorHash({
							txHash: transaction.hash,
							onTxConfirmed: () => {
								setAttempting(false);
							},
						});
					}
				} else {
					setAttempting(false);
				}
			} catch (e) {
				console.log(error);
				setAttempting(false);
				setError(e.message);
			}
		}
		claim();
	}, [monitorHash, error, signer, address, claimData]);

	return (
		<>
			<Head>
				<title>{t('GPP | Synthetix Ambassadors')}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Page>
				<Header title={t('gpp.title')} />
			</Page>
			<BoxContainer>
				<StyledCard>
					<Subtitle>{t('gpp.action.title')}</Subtitle>
					<Block>
						<Description>Enter a wallet address to check if it is eligible for rewards</Description>
						<Input
							placeholder="Wallet Address"
							type="text"
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="off"
							spellCheck="false"
							pattern="^(0x[a-fA-F0-9]{40})$"
							onChange={(e) => setAddress(e.target.value)}
							value={address}
						/>
						{isWalletConnected ? (
							<>
								{claimData && !claimData.hasClaim && <Helper>Not eligible for rewards</Helper>}
								{claimData && claimData.hasClaim && hasClaimed && (
									<Helper>Wallet has already claimed rewards</Helper>
								)}
								{claimData && claimData.hasClaim && !hasClaimed && amount > 0 && (
									<Helper>{`${amount} SNX claimable`}</Helper>
								)}
								<BlockButton
									variant="primary"
									disabled={
										!ethers.utils.isAddress(address ?? '') ||
										!claimData?.hasClaim ||
										attempting ||
										hasClaimed
									}
									onClick={() => handleClaim()}
								>
									{attempting ? 'Claiming...' : 'Claim'}
								</BlockButton>
							</>
						) : (
							<BlockButton onClick={connectWallet} variant="primary">
								Connect Wallet
							</BlockButton>
						)}
					</Block>
				</StyledCard>

				<StyledCard>
					<Subtitle>{t('gpp.info.title')}</Subtitle>
					<Block>
						<Description>
							Governance Participation Rewards are made available for wallets who have delegated to
							the SNX Ambassadors Multisig during the program length. For more information read the{' '}
							<a
								href="https://ambassadors-blog.synthetix.io/governance-participation-program/"
								target="_blank"
								rel="noopener noreferrer"
							>
								blog post.
							</a>
						</Description>

						<StatsRow>
							<p>
								Total Rewards Remaining:
								<span>{formatNumber(totalSupply ?? 0)} SNX</span>
							</p>
						</StatsRow>
						<StatsRow>
							<p>
								Deadline to Claim:
								<span>{deadlineForClaiming}</span>
							</p>
						</StatsRow>
					</Block>
				</StyledCard>
			</BoxContainer>
		</>
	);
};

export default GPP;

const Page = styled.div`
	padding-bottom: 24px;
`;

const BoxContainer = styled(GridDiv)<{ first?: boolean }>`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: ${(props) => (props.first ? '120px auto 20px auto' : '40px auto 20px auto')};
	grid-template-columns: 50% 50%;
	grid-column-gap: 20px;

	@media only screen and (max-width: 1020px) {
		grid-template-columns: auto;
		padding: 0px 16px;
	}
`;

const StyledCard = styled(GradientCard)`
	@media only screen and (max-width: 1020px) {
		width: 100%;
		padding: 12px;
	}
`;

const Block = styled(FlexDivCol)`
	width: 100%;
	padding-bottom: 16px;
	div {
		margin: 8px 0px;
	}
`;

const Subtitle = styled.div`
	color: ${(props) => props.theme.colors.white};
	font-family: ${(props) => props.theme.fonts.expanded};
	font-size: 12px;
	margin-top: 8px;
	line-height: 120%;
	text-transform: uppercase;
	margin-bottom: 16px;
`;

const Input = styled.input`
	width: 100%;
	padding: 8px 8px;
	background: ${(props) => props.theme.colors.black};
	border: 1px solid ${(props) => props.theme.colors.navy};
	margin: 16px 0px;
	color: ${(props) => props.theme.colors.white};
	font-family: ${(props) => props.theme.fonts.mono};
	font-size: 12px;
`;

const Helper = styled.div`
	font-family: ${(props) => props.theme.fonts.regular};
	font-size: 12px;
	color: ${(props) => props.theme.colors.gray};
	text-align: center;
`;

const Description = styled.div`
	font-family: ${(props) => props.theme.fonts.regular};
	font-size: 14px;
	color: ${(props) => props.theme.colors.white};
`;

const BlockButton = styled(Button)`
	margin: 16px 0px;
	text-transform: uppercase;
`;

const StatsRow = styled(FlexDivRow)`
	font-size: 14px;
	font-family: ${(props) => props.theme.fonts.regular};
	width: 100%;
	justify-content: flex-start;
	margin: 0px;

	p {
		font-weight: 700;
		text-transform: capitalize;
		margin: 0px;
		margin-right: 4px;
	}

	span {
		margin: 0px;
		font-weight: 400;
		margin-left: 4px;
	}
`;
