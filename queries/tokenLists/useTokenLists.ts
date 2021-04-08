import { useQuery } from 'react-query';
import axios from 'axios';
import keyBy from 'lodash/keyBy';

import QUERY_KEYS from '../queryKeys';
import { Token, TokenListResponse } from './types';

const useTokenLists = () => {
	return useQuery<Record<string, Token>>(QUERY_KEYS.TokenLists.CoinGecko, async () => {
		const response = await axios.get<TokenListResponse>('https://tokens.1inch.eth.link');

		return keyBy(response.data.tokens, 'symbol');
	});
};

export default useTokenLists;
