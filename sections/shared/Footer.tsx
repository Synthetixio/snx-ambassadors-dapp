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
			<FooterLeft>
				<Svg src={SNXLogo} height={50} />
			</FooterLeft>
			<FooterRight>
				<StyledLink href={''}>
					<Svg src={Discord} />
				</StyledLink>
				<StyledLink href={''}>
					<Svg src={Twitter} />
				</StyledLink>
				<StyledLink href={''}>
					<Svg src={Github} />
				</StyledLink>
			</FooterRight>
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

	@media only screen and (max-width: 1266px) {
		max-width: calc(100% - 40px);
		margin: 0;
	}
`;

const FooterLeft = styled(FlexDivCentered)``;

const FooterRight = styled(FlexDivCentered)`
	svg {
		margin: 0px 12px;
	}
`;

const StyledLink = styled(ExternalLink)``;

export default FooterComponent;
