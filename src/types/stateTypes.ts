export type MessageType = 'error' | 'warning' | 'success';

export type ToastMessageType = {
  messageType: MessageType;
  toastMessage: String;
};
