import QRCode from 'qrcode';

/**
 *
 * @param {*} shortURL
 * @returns Data URI based on the given URL, if no URL is provided, it defaults to the home page URL of the app.
 */
export const generateQR = async (shortURL) => {
  try {
    const url = shortURL || 'https://mini-link-app.vercel.app';

    const qrSrcImg = await QRCode.toDataURL(url);
    return qrSrcImg;
  } catch (err) {
    console.error('Error generating QR code:', err);
    res.status(500).send('Internal Server Error');
  }
};
