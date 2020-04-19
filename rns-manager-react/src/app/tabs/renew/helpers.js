import Utils from 'web3-utils';

function numberToUint32(number) {
  const hexDuration = Utils.numberToHex(number);
  let duration = '';
  for (let i = 0; i < 66 - hexDuration.length; i += 1) {
    duration += '0';
  }
  duration += hexDuration.slice(2);
  return duration;
}

function utf8ToHexString(string) {
  return string ? Utils.asciiToHex(string).slice(2) : '';
}

// eslint-disable-next-line import/prefer-default-export
export const getRenewData = (name, duration) => {
  // 0x + 8 bytes
  const dataSignature = '0x14b1a4fc';

  // 32 bytes
  const dataDuration = numberToUint32(duration);

  // variable length
  const dataName = utf8ToHexString(name);

  return `${dataSignature}${dataDuration}${dataName}`;
};
