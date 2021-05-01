import { FC } from 'react';
import styled from 'styled-components';
import { MAX_PAGE_WIDTH } from 'styles/constants';
import { Svg } from 'react-optimized-image';
import CaretLeft from 'assets/svg/caret-left.svg';
import { useRouter } from 'next/router';
import { FlexDivRow } from 'styles/common';
import { Token } from 'constants/protocols';

type HeaderProps = {
	title: string;
	first?: boolean;
	back?: boolean;
	protocol?: Token;
};

const Header: FC<HeaderProps> = ({ title, first, back, protocol }) => {
	const router = useRouter();

	return (
		<HeaderContainer first={first}>
			{back && (
				<BackIcon onClick={() => router.back()}>
					<Svg src={CaretLeft} />
				</BackIcon>
			)}
			{protocol && <LogoWrapper>{protocol.logo}</LogoWrapper>}

			{title}
		</HeaderContainer>
	);
};

export default Header;

const HeaderContainer = styled(FlexDivRow)<{ first?: boolean }>`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: ${(props) => (props.first ? '60px auto 20px auto' : '40px auto 20px auto')};
	font-size: 28px;
	line-height: 120%;
	font-family: ${(props) => `${props.theme.fonts.expanded}, ${props.theme.fonts.regular}`};
	color: ${(props) => props.theme.colors.white};
	text-transform: uppercase;
	justify-content: flex-start;
	padding: 0px 16px;
	align-items: center;
`;

const BackIcon = styled.div`
	margin-right: 16px;
	cursor: pointer;
`;

const LogoWrapper = styled.div`
	img {
		width: 30px;
		height: auto;
		border-radius: 50px;
		margin-right: 16px;
		margin-top: 4px;
	}
`;
