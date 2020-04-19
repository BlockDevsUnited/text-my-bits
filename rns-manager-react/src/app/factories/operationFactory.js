import { hash as namehash } from 'eth-ens-namehash';
import { notifyTx, notifyError } from '../notifications';

export const get = (request, receive, action) => name => (dispatch) => {
  dispatch(request(name));

  const hash = namehash(name);
  return new Promise((resolve) => {
    action(hash).call((error, result) => {
      if (error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(receive(result)));
    });
  });
};

// eslint-disable-next-line max-len
export const set = (request, receive, txType, action, callback) => (name, value, sender) => (dispatch) => {
  dispatch(request(name, value));

  const hash = namehash(name);

  return new Promise((resolve) => {
    action(hash, value).send(
      { from: sender },
      (error, result) => {
        dispatch(receive());
        if (error) return resolve(dispatch(notifyError(error.message)));
        return resolve(dispatch(notifyTx(result, '', { type: txType, name, value }, callback ? () => callback(name) : null)));
      },
    );
  });
};
