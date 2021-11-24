import { toast as reactToast } from 'react-toastify';

export const toast = (msg: string, autoClose: number, type?: string) => {
  return type === 'error'
    ? reactToast.error(msg, { autoClose, position: 'top-center' })
    : reactToast.info(msg, { autoClose, position: 'top-center' });
};
