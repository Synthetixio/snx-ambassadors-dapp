import React from 'react';
import styled from 'styled-components';
import { Svg } from 'react-optimized-image';

import { FlexDivCentered, ExternalLink } from 'styles/common';
import { MAX_PAGE_WIDTH } from 'styles/constants';

import SNXLogo from 'assets/svg/snx-logo.svg';
import Github from 'assets/svg/github.svg';
import Discord from 'assets/svg/discord.svg';
import Twitter from 'assets/svg/twitter.svg';

const FooterComponent: React.FC = () => {
	return (
		<Footer>
			<FooterInner>
				<FooterLeft>
					<Svg src={SNXLogo} />
				Copyright 2021 Sytnhetix Ambassadors	
				</FooterLeft>
				<FooterRight>
					<StyledLink href={'https://discord.gg/8FPwRwTdd9'}>
						<Svg src={Discord} />
					</StyledLink>
					<StyledLink href={'https://twitter.com/snxambassadors'}>
						<Svg src={Twitter} />
					</StyledLink>
					<StyledLink href={'https://github.com/Synthetixio/snx-ambassadors-dapp'}>
						<Svg src={Github} />
					</StyledLink>
				</FooterRight>
			</FooterInner>
		</Footer>
	);
};

const Footer = styled.footer`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: 0 auto;
	display: flex;
	height: 50px;
	justify-content: space-between;
	position: relative;
	padding: 25px 0px;

	@media only screen and (max-width: 1020px) {
		width: 100%;
		justify-content: space-between;
	}
`;

const FooterInner = styled.div`
	max-width: ${MAX_PAGE_WIDTH}px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media only screen and (max-width: 1020px) {
		width: 100%;
		margin: 0px 24px;
	}
`;

const FooterLeft = styled(FlexDivCentered)`
	svg {
		transform: scale(0.5);
	}
`;

const FooterRight = styled(FlexDivCentered)`
	svg {
		margin: 0px 12px;
	}
`;

const StyledLink = styled(ExternalLink)``;

export default FooterComponent;
