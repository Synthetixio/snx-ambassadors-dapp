import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Svg } from 'react-optimized-image';
import { FlexDivColCentered } from 'styles/common';

import BaseModal from './BaseModal';

import Button from 'components/Button';
import PendingConfirmation from 'assets/svg/pending-confirmation.svg';

type TxConfirmationModalProps = {
	onDismiss: () => void;
	txError: string | null;
	attemptRetry: () => void;
	content: React.ReactNode;
	isSignature?: boolean;
};

const TxConfirmationModal: FC<TxConfirmationModalProps> = ({
	onDismiss,
	txError,
	attemptRetry,
	content,
	isSignature,
}) => {
	const { t } = useTranslation();

	return (
		<StyledBaseModal
			onDismiss={onDismiss}
			isOpen={true}
			title={
				!isSignature ? t('common.confirm-transaction.title') : t('common.confirm-signature.title')
			}
		>
			<FlexDivColCentered>
				<Svg src={PendingConfirmation} />
			</FlexDivColCentered>
			{content}
			<Subtitle>
				{!isSignature
					? t('common.confirm-transaction.helper')
					: t('common.confirm-signature.helper')}
			</Subtitle>
			{txError && (
				<Actions>
					<Message>{t('common.transaction.error')}</Message>
					<MessageButton onClick={attemptRetry}>{t('common.transaction.reattempt')}</MessageButton>
				</Actions>
			)}
		</StyledBaseModal>
	);
};

const StyledBaseModal = styled(BaseModal)`
	[data-reach-dialog-content] {
		width: 400px;
	}
	.card-header {
		font-size: 12px;
		font-family: ${(props) => props.theme.fonts.interBold};
		background-color: ${(props) => props.theme.colors.navy};
		border-bottom: 1px solid ${(props) => props.theme.colors.grayBlue};
	}
	.card-body {
		padding: 24px;
		background-color: ${(props) => props.theme.colors.navy};
	}
`;

const Subtitle = styled.div`
	text-align: center;
	color: ${(props) => props.theme.colors.gray};
	padding: 48px 0px;
	font-size: 12px;
	font-family: ${(props) => props.theme.fonts.regular};
`;

const Actions = styled(FlexDivColCentered)`
	margin: 8px 0px;
`;

const Message = styled.div`
	color: ${(props) => props.theme.colors.white};
	font-size: 12px;
	font-family: ${(props) => props.theme.fonts.regular};
	flex-grow: 1;
	text-align: center;
	margin: 16px 0px;
`;

const MessageButton = styled(Button).attrs({
	variant: 'primary',
	size: 'lg',
	isRounded: true,
})`
	text-transform: uppercase;
	font-size: 12px;
	font-family: ${(props) => props.theme.fonts.condensedMedium};
`;

export default TxConfirmationModal;
