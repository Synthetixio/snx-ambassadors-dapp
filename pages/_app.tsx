import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';

import Layout from 'sections/shared/Layout';
import WithAppContainers from 'containers';

import { scTheme } from 'styles/theme';

import 'styles/index.css';
import 'styles/blog.css';
import '../i18n';
import '@reach/dialog/styles.css';
import 'tippy.js/dist/tippy.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 15000,
		},
	},
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="57x57"
					href="/favicon/apple-touch-icon-57x57.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="114x114"
					href="/favicon/apple-touch-icon-114x114.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="72x72"
					href="/favicon/apple-touch-icon-72x72.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="144x144"
					href="/favicon/apple-touch-icon-144x144.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="60x60"
					href="/favicon/apple-touch-icon-60x60.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="120x120"
					href="/favicon/apple-touch-icon-120x120.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="76x76"
					href="/favicon/apple-touch-icon-76x76.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="152x152"
					href="/favicon/apple-touch-icon-152x152.png"
				/>
				<link rel="icon" type="image/png" href="/favicon/favicon-196x196.png" sizes="196x196" />
				<link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
				<link rel="icon" type="image/png" href="/favicon/favicon-32x32.png" sizes="32x32" />
				<link rel="icon" type="image/png" href="/favicon/favicon-16x16.png" sizes="16x16" />
				<link rel="icon" type="image/png" href="/favicon/favicon-128.png" sizes="128x128" />
				<meta name="application-name" content="&nbsp;" />
				<meta name="msapplication-TileColor" content="#08021E" />
				<meta name="msapplication-TileImage" content="/favicon/mstile-144x144.png" />
				<meta name="msapplication-square70x70logo" content="/favicon/mstile-70x70.png" />
				<meta name="msapplication-square150x150logo" content="/favicon/mstile-150x150.png" />
				<meta name="msapplication-wide310x150logo" content="/favicon/mstile-310x150.png" />
				<meta name="msapplication-square310x310logo" content="/favicon/mstile-310x310.png" />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="Delegate third party voting weight to Synthetix Ambassadors"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@synthetix_io" />
				<meta name="twitter:creator" content="@synthetix_io" />
				{/* open graph */}
				<meta property="og:url" content="https://ambassador.synthetix.io/" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Synthetix Ambassadors" />
				<meta
					property="og:description"
					content="Delegate third party voting weight to Synthetix Ambassadors"
				/>
				<meta property="og:image" content="/static/images/ambassador-social.jpeg" />
				<meta property="og:image:alt" content="Synthetix Ambassadors" />
				<meta property="og:site_name" content="Synthetix Ambassadors" />
				{/* twitter */}
				<meta name="twitter:image" content="/static/images/ambassador-social.jpeg" />
				<meta name="twitter:url" content="https://ambassador.synthetix.io/" />
				<link rel="icon" href="/images/favicon.png" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter" />
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
				<script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js" integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D" crossOrigin="anonymous" async></script>
				<script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>
			</Head>
			<ThemeProvider theme={scTheme}>
				<RecoilRoot>
					<WithAppContainers>
						<QueryClientProvider client={queryClient}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
							<ReactQueryDevtools />
						</QueryClientProvider>
					</WithAppContainers>
				</RecoilRoot>
			</ThemeProvider>
		</>
	);
};

export default App;
