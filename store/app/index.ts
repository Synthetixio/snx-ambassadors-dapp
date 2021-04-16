import { atom } from 'recoil';

import { Language } from 'translations/constants';

import { DEFAULT_LANGUAGE } from 'constants/defaults';

import { getAppKey } from '../utils';

import { languageStateKey } from './constants';

export const appReadyState = atom<boolean>({
	key: getAppKey('appReady'),
	default: false,
});

export const languageState = atom<Language>({
	key: languageStateKey,
	default: DEFAULT_LANGUAGE,
});
