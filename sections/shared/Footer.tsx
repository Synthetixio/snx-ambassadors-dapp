import { FC, useState } from 'react';
import styled from 'styled-components';
import { Svg } from 'react-optimized-image';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { FlexDivCentered } from 'styles/common';
import { MAX_PAGE_WIDTH, Z_INDEX } from 'styles/constants';

import SNXLogo from 'assets/svg/snx-logo.svg';
import Github from 'assets/svg/github.svg';
import Discord from 'assets/svg/discord.svg';
import Twitter from 'assets/svg/twitter.svg';

const FooterComponent: FC = () => {
	const router = useRouter();
	const { t } = useTranslation();

	return (
		<Footer>
			<FooterLeft>
				<Svg src={SNXLogo} />
			</FooterLeft>
			<FooterRight>
				<Svg src={Discord} />
				<Svg src={Twitter} />
				<Svg src={Github} />
			</FooterRight>
		</Footer>
	);
};

const Footer = styled.footer`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;

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

export default FooterComponent;
