import { FC } from 'react';
import styled from 'styled-components';
import { MAX_PAGE_WIDTH } from 'styles/constants';

type HeaderProps = {
	title: string;
	first?: boolean;
};

const Header: FC<HeaderProps> = ({ title, first }) => (
	<HeaderContainer first={first}>{title}</HeaderContainer>
);

export default Header;

const HeaderContainer = styled.div<{ first?: boolean }>`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: ${(props) => (props.first ? '120px auto 20px auto' : '40px auto 20px auto')};
	font-size: 28px;
	line-height: 120%;
	font-family: ${(props) => `${props.theme.fonts.expanded}, ${props.theme.fonts.regular}`};
	color: ${(props) => props.theme.colors.white};
	text-transform: uppercase;
`;
