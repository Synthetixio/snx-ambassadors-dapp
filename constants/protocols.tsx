import Img from 'react-optimized-image';

import Uniswap from 'assets/crypto/uniswap.png';
import Compound from 'assets/crypto/compound.png';
import Aave from 'assets/crypto/aave.png';
import Radicle from 'assets/crypto/radicle.png';
import Pool from 'assets/crypto/pool.png';

export enum SupportedProtocol {
	UNI = 'UNI',
	COMP = 'COMP',
	AAVE = 'AAVE',
	RAD = 'RAD',
	POOL = 'POOL',
}

export type Token = {
	symbol: string;
	logo: React.ReactNode;
	name: string;
	decimals: number;
	address: string;
	subgraph: string;
};

export const protocols = [
	{
		symbol: SupportedProtocol.UNI,
		logo: <Img src={Uniswap} />,
		name: 'Uniswap',
		decimals: 18,
		address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
		subgraph: 'https://api.thegraph.com/subgraphs/name/ianlapham/governance-tracking',
	},
	{
		symbol: SupportedProtocol.COMP,
		logo: <Img src={Compound} />,
		name: 'Compound',
		decimals: 18,
		address: '0xc00e94cb662c3520282e6f5717214004a7f26888',
		subgraph: 'https://api.thegraph.com/subgraphs/name/protofire/compound-governance',
	},
	{
		symbol: SupportedProtocol.AAVE,
		logo: <Img src={Aave} />,
		name: 'Aave',
		decimals: 18,
		address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
		subgraph: 'https://api.thegraph.com/subgraphs/name/aschmidt20/governance-v2-delegate',
	},
	{
		symbol: SupportedProtocol.RAD,
		logo: <Img src={Radicle} />,
		name: 'Radicle',
		decimals: 18,
		address: '0x31c8eacbffdd875c74b94b077895bd78cf1e64a3',
		subgraph: 'https://api.thegraph.com/subgraphs/name/radicle-dev/radicle-governance-homestead',
	},
	{
		symbol: SupportedProtocol.POOL,
		logo: <Img src={Pool} />,
		name: 'PoolTogether',
		decimals: 18,
		address: '0x0cec1a9154ff802e7934fc916ed7ca50bde6844e',
		subgraph: 'https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether-governance',
	},
];

export const protocolsBySymbol = () =>
	protocols.reduce((obj: any, item: Token) => {
		obj[item.symbol] = item;
		return obj;
	}, {});
