import pinataSDK from '@pinata/sdk';
const PINATA_API_KEY = process.env.REACT_APP_API_KEY;
const PINATA_API_SECRET = process.env.REACT_APP_API_KEY_SECRET;

export const uploadIpfs = async (text, ipfs) => {
  // ipfs get connection

  // ipfs upload file
  const { cid } = await ipfs.add(text);
  const hash = cid + '';

  // pinata login
  const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
  await pinata.testAuthentication();

  // pinata pin file
  await pinata.pinByHash(hash);

  return hash;
};
