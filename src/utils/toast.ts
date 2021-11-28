// Dependency imports
import { toast as reactToast } from 'react-toastify';

// React toastify call with custom message, duration and type (informational
// or error specific)
export const toast = (msg: string, autoClose: number, type?: string) => {
  return type === 'error'
    ? reactToast.error(msg, { autoClose, position: 'top-center' })
    : reactToast.info(msg, { autoClose, position: 'top-center' });
};
