import { Document, Page, Text, View } from '@react-pdf/renderer';
import PdfDocumentEvent from './PdfDocumentEvent';
import PropTypes from 'prop-types';
import styles from './PdfDocument.styles';

const PdfDocument = ({ totalWishList, totalPrice, events }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page} wrap>
                <View style={styles.section}>
                    <Text style={styles.heading}>Events Wish List</Text>
                    <View style={styles.eventList}>
                        {events.map((event) => <PdfDocumentEvent key={event.id} event={event} />)}
                    </View>
                    <View>
                        <Text style={styles.totals}>Total events in wish list: {totalWishList}</Text>
                        <Text style={styles.totals}>Total price: {totalPrice}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
};

export default PdfDocument;

PdfDocument.defaultProps = {
};

PdfDocument.propTypes = {
    totalWishList: PropTypes.number.isRequired,
    totalPrice: PropTypes.string,
    events: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            ticketsWishList: PropTypes.number.isRequired,
            availableTickets: PropTypes.number.isRequired,
            displayPrice: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            currency: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })
    )
};