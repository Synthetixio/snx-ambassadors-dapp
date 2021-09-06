import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FlexDivRow, Paragraph, ExternalLink, FlexDivCol, FlexDivCentered } from 'styles/common';
import { MAX_PAGE_WIDTH } from 'styles/constants';
import { Svg } from 'react-optimized-image';
import HeroGraphic from 'assets/svg/hero.svg';

const HomePage: React.FC = () => {
	const { t } = useTranslation();

	return (
		<>
			<Head>
				<title>{t('home.page-title')}</title>
				<link rel="icon" href="/favicon.ico" />
				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
					crossOrigin="anonymous"
				/>
			</Head>
			<Page>
				<HeroContainer>
					<Hero>{t('home.hero')}</Hero>
					<StyledParagraph>{t('ambassadors.description')}</StyledParagraph>
				</HeroContainer>

				<SvgContainer>
					<HeroSvg src={HeroGraphic} />
				</SvgContainer>

				<HeroContainer>
					<StyledParagraph>{t('ambassadors.description')}</StyledParagraph>
				</HeroContainer>
			</Page>
		</>
	);
};

export default HomePage;

const Page = styled.div`
	padding-bottom: 24px;
`;

const HeroContainer = styled(FlexDivCol)`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: 120px auto 20px auto;
	padding: 0px 16px;
`;

const Hero = styled.div`
	font-size: 40px;
	font-family: ${(props) => props.theme.fonts.expanded};
	color: ${(props) => props.theme.colors.white};
	text-transform: uppercase;
	margin-bottom: 16px;

	@media only screen and (max-width: 1020px) {
		font-size: 32px;
	}
`;

const SvgContainer = styled(FlexDivCentered)`
	width: 100%;
	align-items: center;
	margin: 48px auto;
	padding: 48px 0px;
`;

const HeroSvg = styled(Svg)`
	width: 100%;
`;

const StyledParagraph = styled(Paragraph)`
	font-size: 14px;
	font-family: ${(props) => props.theme.fonts.regular};
	color: ${(props) => props.theme.colors.white};
	text-transform: none;
	line-height: 20px;
	max-width: 800px;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledExternalIcon = styled(ExternalLink)``;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledAddressRow = styled(FlexDivRow)`
	justify-content: space-between;
	width: 100%;
`;
