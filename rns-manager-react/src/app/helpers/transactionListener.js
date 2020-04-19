const transactionListener = (tx, callback) => (dispatch) => {
  const checkInterval = setInterval(() => {
    window.ethereum.sendAsync({
      method: 'eth_getTransactionByHash',
      params: [tx],
    }, (err, response) => {
      if (response.result.blockNumber) {
        clearInterval(checkInterval);
        dispatch(callback());
      }
    });
  }, 2000);
};

export default transactionListener;
