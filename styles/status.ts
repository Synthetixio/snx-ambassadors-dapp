export const handleStatusColor = (status?: any, theme?: any) => {
	switch (status) {
		case 'pending':
			return theme.colors.blue;
		case 'active':
			return theme.colors.blue;
		case 'succeeded':
			return theme.colors.green;
		case 'defeated':
			return theme.colors.red;
		case 'queued':
			return theme.colors.gray;
		case 'executed':
			return theme.colors.green;
		case 'canceled':
			return theme.colors.red;
		case 'expired':
			return theme.colors.gray;
		default:
			return theme.colors.gray;
	}
};
