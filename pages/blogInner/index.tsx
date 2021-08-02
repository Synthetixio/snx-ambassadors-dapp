import React, { useMemo } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Header from 'components/Header';
import { Trans, useTranslation } from 'react-i18next';
import {
	FlexDivRow,
	Paragraph,
	GridDiv,
	StyledLink,
	ExternalLink,
	FlexDivCol,
	FlexDivCentered,
} from 'styles/common';
import { MAX_PAGE_WIDTH } from 'styles/constants';
import Table from 'components/Table';
import { CellProps } from 'react-table';
import ProtocolBox from 'sections/home/ProtocolBox';
import { protocols } from 'constants/protocols';
import useProtocolDelegateData from 'hooks/useDelegateInfoForProtocols';
import useProtocolDelegatorData from 'hooks/useDelegatorInfoForProtocols';
import { members, ambassadorMultisig } from 'constants/ambassadorMultisig';
import { Svg } from 'react-optimized-image';
import LinkIcon from 'assets/svg/link-blue.svg';
import { ethers } from 'ethers';
import Masonry from 'components/Masonry';

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};
//...


const blog: React.FC = () => {
	const { t } = useTranslation();

	const protocolDelegates = useProtocolDelegateData();
	const protocolDelegators = useProtocolDelegatorData();

	const memberColumns = useMemo(() => {
		const columns = [
			{
				Header: <>{t('members.table.name')}</>,
				accessor: 'name',
				Cell: (cellProps: CellProps<any>) => {
					return <StyledParagraph>{cellProps.value}</StyledParagraph>;
				},

				sortable: false,
				width: 600,
			},
			{
				Header: <>{t('members.table.address')}</>,
				accessor: 'address',
				Cell: (cellProps: CellProps<any>) => {
					return (
						<StyledAddressRow>
							<StyledParagraph>{ethers.utils.getAddress(cellProps.value)}</StyledParagraph>
							<StyledExternalIcon
								href={`https://etherscan.io/address/${ethers.utils.getAddress(cellProps.value)}`}
							>
								<Svg src={LinkIcon} />
							</StyledExternalIcon>
						</StyledAddressRow>
					);
				},
				sortable: false,
				width: 600,
			},
		];

		return columns;
	}, [t]);

	return (
		<>
			<Head>
				<title>Blog Post | Synthetix Ambassadors</title>
				<link rel="icon" href="/favicon.ico" />
        
        ;<link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
      </Head>
			<Page>

        ;<div className="container blog-container">
          <div className="featured-post">
            <p className=" blog-date">APR 20, 2021</p>
            <span className="back-btn">
              <a href="blog">
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.9996 4.99997H3.40643L6.7078 1.71268C6.89618 1.52453 7.00201 1.26935 7.00201 1.00326C7.00201 0.737183 6.89618 0.481998 6.7078 0.29385C6.51942 0.105701 6.26392 0 5.99751 0C5.73109 0 5.47559 0.105701 5.28721 0.29385L0.285132 5.28973C0.194054 5.38476 0.122659 5.49681 0.0750447 5.61946C-0.0250149 5.86272 -0.0250149 6.13557 0.0750447 6.37884C0.122659 6.50149 0.194054 6.61354 0.285132 6.70856L5.28721 11.7044C5.38021 11.7981 5.49086 11.8724 5.61277 11.9232C5.73468 11.9739 5.86544 12 5.99751 12C6.12957 12 6.26033 11.9739 6.38224 11.9232C6.50415 11.8724 6.6148 11.7981 6.7078 11.7044C6.80157 11.6116 6.87599 11.501 6.92678 11.3793C6.97757 11.2575 7.00372 11.1269 7.00372 10.995C7.00372 10.8631 6.97757 10.7325 6.92678 10.6108C6.87599 10.489 6.80157 10.3785 6.7078 10.2856L3.40643 6.99832H10.9996C11.2649 6.99832 11.5194 6.89305 11.707 6.70567C11.8946 6.51829 12 6.26415 12 5.99915C12 5.73415 11.8946 5.48001 11.707 5.29262C11.5194 5.10524 11.2649 4.99997 10.9996 4.99997Z"
                    fill="#00D1FF"
                  />
                </svg>
              </a>
            </span>
            <span>
              <h1 className="featured-blog-header-inner">
                SNX liquidity incentive for sUSD/DHT Uniswap pool
              </h1>
            </span>
            <img className="featured-post-img" src="/assets/blog/blog-img1.jpg" alt="img" />
            <p className="post-excerpt-intro">
              The synthetixDAO has agreed to contribute 3000 SNX per week in incentives
              towards a new liquidity pool of DHT and sUSD for ten weeks.
            </p>
            <p className="post-content-blog-inner">
              With the success of multi-collateral loans on Synthetix over the last 6
              months, the time has come to sunset previous EtherCollateral loan
              contracts that are no longer active. Specifically, the following contracts
              will be deprecated:
              <br />
              <br />
              <strong>Ether Collateral v3.0 (SIP-85)</strong>
              At this point, opening of new loans on these contracts has effectively
              been paused. Users with loans outstanding on these contracts will have
              until 00:00 UTC on June 25th, 2021 (one month from now) to repay and close
              existing loans, after which point liquidation of any remaining loans will
              be enabled.
              <br />
              <br />
              Any users with existing loans originated from the trial EtherCollateral
              loans can close them here. Once liquidations are enabled, any user will be
              able repay sUSD / sETH owed on a loan and claim all of the ETH collateral
              as a penalty, so users who still have outstanding loans on these contracts
              should close them out immediately.
            </p>
            <div className="social-share">
              <span className="social-share-icon">
                <svg
                  width={22}
                  height={18}
                  viewBox="0 0 22 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.2688 4.66318C19.2834 4.85249 19.2834 5.04099 19.2834 5.22949C19.2834 10.9982 14.8926 17.6453 6.86838 17.6453C4.39595 17.6453 2.09901 16.9295 0.166885 15.6856C0.517885 15.7262 0.855885 15.74 1.2207 15.74C3.26007 15.74 5.13776 15.051 6.63845 13.8753C5.72776 13.8589 4.84493 13.5585 4.11326 13.0161C3.38158 12.4736 2.83759 11.7162 2.55726 10.8496C2.82701 10.8902 3.09839 10.917 3.38195 10.917C3.77276 10.917 4.16601 10.8626 4.53163 10.7683C3.54346 10.5687 2.65489 10.0332 2.01693 9.25256C1.37898 8.47197 1.03102 7.49455 1.0322 6.48643V6.43199C1.63689 6.76884 2.31247 6.95841 3.00414 6.9853C2.40523 6.58736 1.91411 6.04739 1.57458 5.41354C1.23504 4.7797 1.05764 4.07168 1.0582 3.35262C1.0582 2.54255 1.27351 1.79912 1.65132 1.15155C2.74784 2.50036 4.11544 3.6038 5.66556 4.39041C7.21568 5.17701 8.91374 5.62924 10.6498 5.71781C10.58 5.3892 10.5438 5.05436 10.5417 4.71843C10.5417 2.31343 12.4876 0.354492 14.9048 0.354492C16.1618 0.354492 17.296 0.880992 18.0939 1.73249C19.0708 1.5434 20.0077 1.18659 20.8629 0.677867C20.5371 1.68634 19.8548 2.54141 18.9438 3.08287C19.8102 2.98404 20.657 2.75619 21.456 2.40687C20.8593 3.27709 20.1198 4.04021 19.2688 4.66399V4.66318Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span className="social-share-icon">
                <svg
                  width={18}
                  height={21}
                  viewBox="0 0 18 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.13832 8.6297H7.13819C6.85895 8.62972 6.59116 8.74066 6.39372 8.93812C6.19628 9.13557 6.08536 9.40338 6.08537 9.68261C6.08538 9.96185 6.19631 10.2296 6.39376 10.4271C6.59122 10.6245 6.85902 10.7355 7.13825 10.7355C7.41749 10.7355 7.68529 10.6245 7.88274 10.4271C8.08019 10.2296 8.19112 9.96185 8.19113 9.68261C8.19114 9.40338 8.08022 9.13557 7.88278 8.93812C7.68534 8.74066 7.41755 8.62972 7.13832 8.6297ZM10.8926 8.6297C10.6627 8.61022 10.4322 8.66061 10.2314 8.77428C10.0306 8.88795 9.86877 9.0596 9.76714 9.26676C9.66551 9.47393 9.62879 9.70695 9.6618 9.93533C9.69481 10.1637 9.796 10.3768 9.95213 10.5467C10.1083 10.7166 10.3121 10.8354 10.5368 10.8876C10.7616 10.9398 10.9969 10.9228 11.2119 10.839C11.4269 10.7552 11.6116 10.6085 11.7418 10.418C11.872 10.2275 11.9417 10.0021 11.9417 9.77136C11.9478 9.6275 11.9255 9.48384 11.8761 9.34859C11.8267 9.21334 11.7511 9.08915 11.6537 8.98312C11.5563 8.8771 11.4389 8.79131 11.3083 8.73067C11.1777 8.67003 11.0365 8.63572 10.8926 8.6297ZM15.8914 0H2.10865C1.83106 0.000655805 1.55632 0.0559843 1.30012 0.162826C1.04391 0.269668 0.811264 0.42593 0.615455 0.622689C0.419646 0.819449 0.264513 1.05285 0.158914 1.30957C0.0533144 1.56629 -0.000682443 1.84129 6.51056e-06 2.11888V16.0252C-0.000670609 16.3027 0.0533348 16.5777 0.158939 16.8344C0.264543 17.0911 0.419678 17.3245 0.615485 17.5213C0.811291 17.718 1.04394 17.8743 1.30013 17.9811C1.55633 18.088 1.83106 18.1433 2.10865 18.144H13.7726L13.2274 16.2411L14.544 17.4651L15.7886 18.6171L18 20.5714V2.11888C18.0007 1.84129 17.9467 1.56629 17.8411 1.30957C17.7355 1.05285 17.5804 0.819449 17.3846 0.622689C17.1887 0.42593 16.9561 0.269668 16.6999 0.162826C16.4437 0.0559843 16.169 0.000655805 15.8914 0ZM11.9211 13.4331V13.4332C11.9211 13.4332 11.5508 12.9908 11.2422 12.6C11.9878 12.4244 12.6473 11.9909 13.104 11.376C12.7339 11.6223 12.3371 11.8259 11.9211 11.9828C11.4426 12.1871 10.9422 12.3355 10.4297 12.4251C9.5488 12.5873 8.64538 12.5838 7.76576 12.4149C7.24932 12.3138 6.74319 12.1657 6.25367 11.9726C5.99567 11.8734 5.7448 11.7565 5.50282 11.6229C5.47193 11.6022 5.44117 11.592 5.41029 11.5714C5.39481 11.5637 5.38087 11.5533 5.36915 11.5406C5.18409 11.4377 5.08106 11.3657 5.08106 11.3657C5.5213 11.9677 6.15798 12.397 6.88111 12.5794C6.57264 12.9703 6.19203 13.4331 6.19203 13.4331C5.58104 13.4496 4.97538 13.3156 4.42834 13.043C3.8813 12.7703 3.40966 12.3674 3.05494 11.8697C3.08833 9.78449 3.59475 7.73409 4.53601 5.87311C5.36436 5.22254 6.37426 4.84517 7.42627 4.79311L7.52905 4.91659C6.53931 5.16149 5.61572 5.62153 4.82401 6.26398C4.82401 6.26398 5.05033 6.14057 5.43083 5.9657C6.17021 5.62818 6.95824 5.4095 7.76583 5.31775C7.82342 5.30577 7.88195 5.29886 7.94075 5.29712C8.62999 5.20733 9.32751 5.20045 10.0184 5.27661C11.1049 5.40067 12.1567 5.73609 13.1144 6.26398C12.3628 5.65219 11.4899 5.20695 10.5534 4.9577L10.6973 4.79321C11.7493 4.84523 12.7592 5.2226 13.5876 5.87321C14.5289 7.73414 15.0354 9.78453 15.0688 11.8697C14.7111 12.367 14.2374 12.7694 13.6889 13.0418C13.1403 13.3143 12.5335 13.4486 11.9211 13.4331Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20 10.0608C20 4.5048 15.5224 0 10 0C4.47758 0 0 4.5048 0 10.0608C0 15.082 3.65634 19.2444 8.43765 20V12.9697H5.8979V10.0608H8.43765V7.84376C8.43765 5.32252 9.9311 3.92892 12.2149 3.92892C13.3089 3.92892 14.4537 4.12558 14.4537 4.12558V6.60155H13.1922C11.9505 6.60155 11.5623 7.37688 11.5623 8.1734V10.0607H14.3355L13.8925 12.9696H11.5623V19.9999C16.3436 19.2457 19.9999 15.0833 19.9999 10.0607L20 10.0608Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

			</Page>
		</>
	);
};

export default blog;

const converted = { "*": { margin: "0 auto", padding: "0", maxWidth: "100%" } }

const Page = styled.div`
	padding-bottom: 24px;
`;

const StyledGrid = styled(GridDiv)`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: 0 auto;
	column-gap: 16px;
	grid-template-columns: auto auto auto;
	padding: 0px 16px;

	@media only screen and (max-width: 1020px) {
		grid-template-columns: auto;
	}
`;

const BoxContainer = styled(FlexDivRow)<{ first?: boolean }>`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: ${(props) => (props.first ? '120px auto 20px auto' : '40px auto 20px auto')};
	padding: 0px 16px;
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
	@media only screen and (min-width: 1440px) {
		display: none;
	}
`;

const StyledTable = styled(Table)`
	width: 100%;

	.table-body-cell {
		height: 40px;
	}
	.table-body-cell,
	.table-header-cell {
		&:last-child {
		}
	}
`;

const StyledParagraph = styled(Paragraph)`
	font-size: 14px;
	font-family: ${(props) => props.theme.fonts.regular};
	color: ${(props) => props.theme.colors.white};
	text-transform: none;
	line-height: 20px;
`;

const StyledExternalIcon = styled(ExternalLink)``;

const StyledAddressRow = styled(FlexDivRow)`
	justify-content: space-between;
	width: 100%;
`;
