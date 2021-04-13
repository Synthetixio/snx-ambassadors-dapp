export const ROUTES = {
	Delegate: '/',
	Vote: '/vote',
	Protocol: (ticker: string) => `/protocol/${ticker}`,
};

export default ROUTES;
