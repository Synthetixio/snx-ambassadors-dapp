import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Svg } from 'react-optimized-image';
import FourOFour from 'assets/svg/404.svg';

import { absoluteCenteredCSS } from 'styles/common';
import Button from 'components/Button';
import { useRouter } from 'next/router';

const NotFoundPage = () => {
	const { t } = useTranslation();
	const router = useRouter();

	return (
		<>
			<Head>
				<title>{t('common.not-found.page-title')}</title>
			</Head>
			<Container>
				<Svg src={FourOFour} />
				<Title>{t('common.not-found.title')}</Title>
				<Subtitle>{t('common.not-found.subtitle')}</Subtitle>
				<TextButton onClick={() => router.push('/')} variant="text">
					{t('common.not-found.button')}
				</TextButton>
			</Container>
		</>
	);
};

const Container = styled.div`
	${absoluteCenteredCSS};
	text-align: center;
	margin-top: -32px;

	@media only screen and (max-width: 1020px) {
		width: 100%;
	}
`;

const Title = styled.h1`
	color: ${(props) => props.theme.colors.white};
	font-family: ${(props) => props.theme.fonts.interBold};
	font-size: 14px;
`;

const Subtitle = styled.h2`
	color: ${(props) => props.theme.colors.gray};
	font-family: ${(props) => props.theme.fonts.regular};
	font-size: 14px;
	margin: 0px 24px;
	width: 500px;
	line-height: 25px;

	@media only screen and (max-width: 1020px) {
		width: 100%;
		margin: 0px;
	}
`;

const TextButton = styled(Button)`
	font-family: ${(props) => props.theme.fonts.condensedBold};
	color: ${(props) => props.theme.colors.blue};
	font-size: 14px;
	text-transform: uppercase;
	margin-top: 5px;
`;

export default NotFoundPage;
