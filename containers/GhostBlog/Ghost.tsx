import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';

import GhostContentAPI, { GhostAPI } from '@tryghost/content-api';
import { useRecoilValue } from 'recoil';
import { appReadyState } from 'store/app';

const DEFAULT_GHOST_HOST = 'https://demo.ghost.io';
const DEFAULT_GHOST_KEY = '22444f78447824223cefc48062';

const useGhost = () => {
	const [ghostInstance, setGhostInstance] = useState<GhostAPI | null>(null);
	const isAppReady = useRecoilValue(appReadyState);

	useEffect(() => {
		if (isAppReady) {
			setGhostInstance(
				new GhostContentAPI({
					url: process.env.NEXT_PUBLIC_GHOST_API_URL ?? DEFAULT_GHOST_HOST,
					key: process.env.NEXT_PUBLIC_GHOST_KEY ?? DEFAULT_GHOST_KEY,
					version: 'v3',
				})
			);
		}
	}, [isAppReady, setGhostInstance]);

	return {
		ghostInstance,
	};
};

const Ghost = createContainer(useGhost);

export default Ghost;
