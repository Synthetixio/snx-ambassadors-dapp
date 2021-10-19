import { createContainer } from 'unstated-next';
import { TransactionData } from 'bnc-notify';

import Connector from 'containers/Connector';
import Etherscan from 'containers/Etherscan';

const useNotify = () => {
	const { notify } = Connector.useContainer();
	const { etherscanInstance } = Etherscan.useContainer();

	const monitorHash = ({
		txHash,
		onTxConfirmed,
	}: {
		txHash: string;
		onTxConfirmed?: (txData: TransactionData) => void;
	}) => {
		if (notify) {
			const { emitter } = notify.hash(txHash);

			const link = etherscanInstance != null ? etherscanInstance.txLink(txHash) : undefined;

			emitter.on('txPool', () => {
				return {
					onclick: () => window.open(link),
					link,
				};
			});
			emitter.on('txSent', console.log);
			emitter.on('txConfirmed', () => {
				return {
					onclick: () => window.open(link),
					link,
				};
			});
			emitter.on('txSpeedUp', console.log);
			emitter.on('txCancel', console.log);
			emitter.on('txFailed', () => {
				return {
					onclick: () => window.open(link),
					link,
				};
			});

			emitter.on('txConfirmed', (txData) => {
				if (onTxConfirmed != null) {
					onTxConfirmed(txData);
				}
				return {
					onclick: () => window.open(link),
					link,
				};
			});
		}
	};
	return {
		monitorHash,
	};
};

const Notify = createContainer(useNotify);

export default Notify;
