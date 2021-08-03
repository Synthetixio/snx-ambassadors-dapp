export const ROUTES = {
	Vote: 'https://staking.synthetix.io/gov/snxambassador.eth',
	Protocol: (ticker: string) => `/protocol/${ticker}`,
	Delegate: '/delegate',
	Blog: '/blog',
};

export default ROUTES;
