import { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { Svg } from 'react-optimized-image';

import AmbassadorLogo from 'assets/svg/ambassador-logo.svg';
import MenuHamburgerIcon from 'assets/svg/menu-hamburger.svg';
import MenuCloseIcon from 'assets/svg/menu-close.svg';

import { MAX_PAGE_WIDTH, Z_INDEX } from 'styles/constants';
import ROUTES from 'constants/routes';
import { useRouter } from 'next/router';
import { FlexDivCentered, IconButton, UpperCased } from 'styles/common';
import Button from 'components/Button';
import ConnectionDot from 'components/ConnectionDot';
import { useTranslation } from 'react-i18next';

const Header: FC = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => setMenuOpen(!menuOpen);
	const router = useRouter();
	const { t } = useTranslation();

	return (
		<>
			<HeaderContainer>
				<HeaderContainerInner>
					<HeaderSectionLeft>
						<StatsLogoWrap>
							<Svg src={AmbassadorLogo} />
						</StatsLogoWrap>
					</HeaderSectionLeft>
					<HeaderSectionRight>
						{Object.entries(ROUTES).map(([key, value]) => (
							<HeaderLink key={key} onClick={() => router.push(value)}>
								{key}
							</HeaderLink>
						))}
						<WalletButton variant="solid" onClick={() => {}}>
							<FlexDivCentered>
								<StyledConnectionDot />
								<UpperCased>{t('common.wallet.not-connected')}</UpperCased>
							</FlexDivCentered>
						</WalletButton>
						<MenuToggleButton onClick={toggleMenu}>
							{menuOpen ? <Svg src={MenuCloseIcon} /> : <Svg src={MenuHamburgerIcon} />}
						</MenuToggleButton>
					</HeaderSectionRight>
				</HeaderContainerInner>
			</HeaderContainer>
			<Divider />
			{menuOpen ? (
				<MobileMenu>
					{Object.entries(ROUTES).map(([key, value]) => (
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

// TODO create a common flex container
const HeaderContainer = styled.div`
	height: 60px;
	padding-top: 35px;
	position: fixed;
	font-style: normal;
	font-weight: bold;
	width: 100%;
	margin-left: -20px;
	z-index: ${Z_INDEX.thousand};
	background-color: ${(props) => props.theme.colors.darkBlue};
	@media only screen and (max-width: 1266px) {
		margin-left: 0;
	}
`;

const HeaderContainerInner = styled.div`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
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
	font-family: ${(props) => `${props.theme.fonts.condensedBold}, ${props.theme.fonts.regular}`};
	font-size: 12px;
	color: ${(props) => props.theme.colors.white};
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
	background-color: ${(props) => props.theme.colors.darkBlue};
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

const Divider = styled.div`
	background: ${(props) => props.theme.colors.white};
	opacity: 0.1;
	width: 100%;
	height: 1px;
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

const WalletButton = styled(Button)`
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid ${(props) => props.theme.colors.mediumBlue};

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
			background: ${(props) => props.theme.colors.darkBlue};
		}
	}
`;

const MenuButton = styled(IconButton)<{ isActive: boolean }>`
	border: 1px solid ${(props) => props.theme.colors.mediumBlue};
	color: ${(props) => (props.isActive ? props.theme.colors.white : props.theme.colors.gray)};
	padding: 7px;
	border-radius: 4px;
	background: ${(props) => props.theme.colors.darkBlue};
	&:hover {
		color: ${(props) => props.theme.colors.white};
	}
	height: 32px;
`;

const StyledConnectionDot = styled(ConnectionDot)`
	margin-right: 8px;
`;
