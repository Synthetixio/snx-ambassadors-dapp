import { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { Svg } from 'react-optimized-image';
import OutsideClickHandler from 'react-outside-click-handler';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import Link from 'next/link';

import AmbassadorLogo from 'assets/svg/ambassador-logo.svg';
import MenuHamburgerIcon from 'assets/svg/menu-hamburger.svg';
import MenuCloseIcon from 'assets/svg/menu-close.svg';
import CaretUp from 'assets/svg/caret-up.svg';
import CaretDown from 'assets/svg/caret-down.svg';
import ExitIcon from 'assets/svg/exit.svg';
import WalletIcon from 'assets/svg/wallet.svg';
import ArrowsChangeIcon from 'assets/svg/arrows-change.svg';

import Connector from 'containers/Connector';

import ROUTES from 'constants/routes';
import { zIndex } from 'constants/ui';

import { isWalletConnectedState, networkState, truncatedWalletAddressState } from 'store/wallet';

import {
	FlexDivCentered,
	FlexDivCol,
	FlexDivColCentered,
	linkCSS,
	UpperCased,
	Divider,
} from 'styles/common';
import { MAX_PAGE_WIDTH, Z_INDEX } from 'styles/constants';

import Button from 'components/Button';
import ConnectionDot from 'components/ConnectionDot';

const caretUp = <Svg src={CaretUp} viewBox={`0 0 ${CaretUp.width} ${CaretUp.height}`} />;
const caretDown = <Svg src={CaretDown} viewBox={`0 0 ${CaretDown.width} ${CaretDown.height}`} />;
const exitIcon = <Svg src={ExitIcon} />;
const walletIcon = <Svg src={WalletIcon} />;
const changeIcon = <Svg src={ArrowsChangeIcon} />;

const Header: FC = () => {
	const { t } = useTranslation();
	const {
		connectWallet,
		disconnectWallet,
		isHardwareWallet,
		switchAccounts,
	} = Connector.useContainer();
	const router = useRouter();

	const [menuOpen, setMenuOpen] = useState(false);

	const [walletOptionsModalOpened, setWalletOptionsModalOpened] = useState<boolean>(false);

	const truncatedWalletAddress = useRecoilValue(truncatedWalletAddressState);
	const isWalletConnected = useRecoilValue(isWalletConnectedState);
	const network = useRecoilValue(networkState);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	const getNetworkName = () => {
		if (network?.useOvm) {
			return `0Ξ ${network?.name}`;
		} else return network?.name;
	};

	const NAV_LINKS = {
		DELEGATE: ROUTES.Delegate,
		VOTE: ROUTES.Vote,
	};

	return (
		<>
			<HeaderContainer>
				<HeaderContainerInner>
					<HeaderSectionLeft>
						<StatsLogoWrap>
							<Link href="/">
								<StyledLink>
									<Svg src={AmbassadorLogo} />
								</StyledLink>
							</Link>
						</StatsLogoWrap>
					</HeaderSectionLeft>
					<HeaderSectionRight>
						{Object.entries(NAV_LINKS).map(([key, value]) => (
							<HeaderLink key={key} onClick={() => router.push(value)}>
								{key}
							</HeaderLink>
						))}
						<DropdownContainer>
							<OutsideClickHandler onOutsideClick={() => setWalletOptionsModalOpened(false)}>
								{isWalletConnected ? (
									<WalletButton
										variant="solid"
										onClick={() => {
											setWalletOptionsModalOpened(!walletOptionsModalOpened);
										}}
										isActive={walletOptionsModalOpened}
										data-testid="user-menu"
									>
										<FlexDivCentered data-testid="wallet-address">
											<StyledConnectionDot />
											{truncatedWalletAddress}
										</FlexDivCentered>
										<NetworkTag className="network-tag" data-testid="network-tag">
											{getNetworkName()}
										</NetworkTag>
										{walletOptionsModalOpened ? caretUp : caretDown}
									</WalletButton>
								) : (
									<WalletButton variant="solid" onClick={() => connectWallet()}>
										<FlexDivCentered>
											<StyledConnectionDot />
											<UpperCased>{t('common.wallet.not-connected')}</UpperCased>
										</FlexDivCentered>
									</WalletButton>
								)}
								{walletOptionsModalOpened && (
									<StyledMenuModal>
										<Buttons>
											<StyledButton
												onClick={() => {
													setWalletOptionsModalOpened(false);

													connectWallet();
												}}
											>
												{walletIcon} {t('common.wallet.change-wallet')}
											</StyledButton>
											{isHardwareWallet() && (
												<StyledButton
													onClick={() => {
														setWalletOptionsModalOpened(false);

														switchAccounts();
													}}
												>
													{changeIcon} {t('common.wallet.switch-account')}
												</StyledButton>
											)}
											<StyledDivider />
											<StyledTextButton
												onClick={() => {
													setWalletOptionsModalOpened(false);
													disconnectWallet();
												}}
											>
												{exitIcon} {t('common.wallet.disconnect')}
											</StyledTextButton>
										</Buttons>
									</StyledMenuModal>
								)}
								{/* <MenuToggleButton onClick={toggleMenu}>
									{menuOpen ? <Svg src={MenuCloseIcon} /> : <Svg src={MenuHamburgerIcon} />}
								</MenuToggleButton> */}
							</OutsideClickHandler>
						</DropdownContainer>
					</HeaderSectionRight>
				</HeaderContainerInner>
			</HeaderContainer>
			{menuOpen ? (
				<MobileMenu>
					{Object.entries(NAV_LINKS).map(([key, value]) => (
						<MobileLink
							key={key}
							onClick={() => {
								router.push(value);
								toggleMenu();
							}}
						>
							{key}
						</MobileLink>
					))}
				</MobileMenu>
			) : null}
		</>
	);
};

export default Header;

const HeaderContainer = styled.div`
	height: 75px;
	padding-top: 35px;
	font-style: normal;
	font-weight: bold;
	width: 100%;
	z-index: ${Z_INDEX.thousand};
	background-color: ${(props) => props.theme.colors.black};
	@media only screen and (max-width: 1266px) {
		margin-left: 0;
	}
`;

const HeaderContainerInner = styled.div`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media only screen and (max-width: 1266px) {
		max-width: calc(100% - 40px);
		margin: 0;
	}
`;

const StatsLogoWrap = styled.div`
	margin-top: -4px;
`;

const HeaderSectionLeft = styled.div`
	display: flex;
	justify-content: space-between;
`;

const HeaderSectionRight = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-family: ${(props) => `${props.theme.fonts.condensedBold}, ${props.theme.fonts.regular}`};
	font-size: 12px;
	color: ${(props) => props.theme.colors.white};
`;

const StyledLink = styled.div`
	${linkCSS}
	cursor: pointer;
`;

const HeaderLink = styled.div`
	margin-left: 25px;
	cursor: pointer;
	text-transform: uppercase;
	@media only screen and (max-width: 799px) {
		display: none;
	}
`;

const MobileMenu = styled.div`
	position: fixed;
	top: 95px;
	width: 100%;
	display: flex;
	flex-direction: column;
	z-index: ${Z_INDEX.thousand};
	background-color: ${(props) => props.theme.colors.navy};
	justify-content: space-between;
	font-size: 20px;
	line-height: 120%;
	font-family: ${(props) => `${props.theme.fonts.expanded}, ${props.theme.fonts.regular}`};
	color: ${(props) => props.theme.colors.white};
	@media only screen and (min-width: 800px) {
		display: none;
	}
`;

const MobileLink = styled.div`
	margin: 0 0 40px 30px;
	cursor: pointer;
	text-transform: uppercase;
`;

const MenuToggleButton = styled.button`
	background: transparent;
	border: 0;
	margin: -5px 10px 0 0;
	padding: 0;
	cursor: pointer;
	width: 16px;
	height: 16px;
	outline: none;
	@media only screen and (min-width: 800px) {
		display: none;
	}
`;

const NetworkTag = styled(FlexDivCentered)`
	background: ${(props) => props.theme.colors.mediumBlue};
	font-size: 10px;
	font-family: ${(props) => props.theme.fonts.condensedMedium};
	padding: 2px 5px;
	border-radius: 100px;
	height: 18px;
	text-align: center;
	justify-content: center;
	text-transform: uppercase;
`;

const WalletButton = styled(Button).attrs({
	size: 'md',
})`
	width: 175px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border: 1px solid ${(props) => props.theme.colors.mediumBlue};
	background: ${(props) => props.theme.colors.navy};

	svg {
		margin-left: 5px;
		width: 10px;
		height: 10px;
		color: ${(props) => props.theme.colors.gray};
		${(props) =>
			props.isActive &&
			css`
				color: ${(props) => props.theme.colors.white};
			`}
	}
	&:hover {
		${NetworkTag} {
			background: ${(props) => props.theme.colors.navy};
		}
	}
`;

const StyledConnectionDot = styled(ConnectionDot)`
	margin-right: 8px;
`;

const DropdownContainer = styled.div`
	width: 185px;
	height: 32px;
	position: relative;
	margin-left: 24px;

	> div {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		z-index: ${zIndex.DROPDOWN};
		width: inherit;
	}
`;

const StyledMenuModal = styled(FlexDivColCentered)`
	margin-top: 12px;
	background: ${(props) => props.theme.colors.navy};
	border: 1px solid ${(props) => props.theme.colors.mediumBlue};
	border-radius: 4px;
	width: 175px;
`;

const StyledTextButton = styled(Button).attrs({
	variant: 'text',
	size: 'md',
})`
	font-family: ${(props) => props.theme.fonts.condensedMedium};
	padding: 0 20px;
	display: inline-grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	justify-items: center;
	text-transform: uppercase;

	svg {
		margin-right: 5px;
		color: ${(props) => props.theme.colors.gray};
	}
`;

const StyledButton = styled(Button).attrs({
	variant: 'outline',
	size: 'md',
})`
	font-family: ${(props) => props.theme.fonts.condensedMedium};
	padding: 0 20px;
	display: inline-grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	justify-items: center;
	text-transform: uppercase;

	margin: 6px 0px;

	svg {
		margin-right: 5px;
		color: ${(props) => props.theme.colors.gray};
	}
`;

const Buttons = styled(FlexDivCol)`
	margin: 0px 8px;
`;

const StyledDivider = styled(Divider)`
	margin: 8px 0px;
`;
