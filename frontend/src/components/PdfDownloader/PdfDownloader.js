import { PDFDownloadLink } from '@react-pdf/renderer';
import classes from './PdfDownloader.module.css';
import PdfDocument from './PdfDocument';
import { useSelector } from 'react-redux';

const PdfDownloader = ({ events }) => {
    const totalWishList = useSelector(state => state.events.totalWishList);
    const totalPrice = useSelector(state => state.events.totalPrice / 100 + ' USD');

    const PdfDocumentWithData = () => <PdfDocument totalWishList={totalWishList} totalPrice={totalPrice} events={events} />;

    return (
        <>
            <PDFDownloadLink
                className={classes['pdf-link']}
                document={<PdfDocumentWithData />}
                fileName="events-wishlist.pdf">
                Download events
            </PDFDownloadLink>
        </>
    )
};

export default PdfDownloader;