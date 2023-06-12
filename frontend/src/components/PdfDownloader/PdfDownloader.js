import { PDFDownloadLink } from '@react-pdf/renderer';

import PdfDocument from './PdfDocument';
import { useSelector } from 'react-redux';
import {
  selectTotalWishList,
  selectTotalPrice,
} from '../../store/events-slice';

import classes from './PdfDownloader.module.css';

const PdfDownloader = ({ events }) => {
  const totalWishList = useSelector(selectTotalWishList);
  const totalPrice = useSelector(selectTotalPrice) / 100 + ' USD';

  const PdfDocumentWithData = () => (
    <PdfDocument
      totalWishList={totalWishList}
      totalPrice={totalPrice}
      events={events}
    />
  );

  return (
    <>
      <PDFDownloadLink
        className={classes['pdf-link']}
        document={<PdfDocumentWithData />}
        fileName='events-wishlist.pdf'
      >
        {({ blob, url, loading, error }) => {
          return (
            <span
              className={`${classes['pdf-link--content']} ${
                loading ? classes['pdf-link--loading'] : ''
              }`}
            >
              Download Events
            </span>
          );
        }}
      </PDFDownloadLink>
    </>
  );
};

export default PdfDownloader;
