import { Text, View, Image } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import styles from './PdfDocumentEvent.styles';

const PdfDocumentEvent = ({ event }) => {
    const { title, image, location, date, ticketsWishList, displayPrice, price, category, currency, description, address } = event;

    const eventDate = date.split('T')[0].split('-').join(' ');
    let eventTime = date.split('T')[1].split(':');
    eventTime.pop();
    eventTime = eventTime.join(':');
    const totalPrice = (price * ticketsWishList) / 100;    

    return (
        <View style={styles.eventItem} wrap={false}>
            <View style={styles.eventDetails}>
                <Text style={styles.eventDetailsItem}>{title}</Text>
                <Text style={styles.eventDetailsItem}><Text style={styles.eventLabel}>Type:</Text> {category}</Text>
                <Text style={styles.eventDetailsItem}><Text style={styles.eventLabel}>Summary:</Text> {description}</Text>
                <Text style={styles.eventDetailsItem}><Text style={styles.eventLabel}>When:</Text> {eventDate}</Text>
                <Text style={styles.eventDetailsItem}><Text style={styles.eventLabel}>Starts at:</Text> {eventTime}</Text>
                <Text style={styles.eventDetailsItem}><Text style={styles.eventLabel}>Where:</Text> {location} {address} </Text>
                <Text style={styles.eventDetailsItem}><Text style={styles.eventLabel}>Ticket Price:</Text> {displayPrice} {currency}</Text>
                <Text style={styles.eventDetailsItem}><Text style={styles.eventLabel}>Total Price:</Text> {totalPrice} {currency}</Text>
                <Text style={styles.eventDetailsItem}><Text style={styles.eventLabel}>In wishlist:</Text> {ticketsWishList}</Text>
            </View>
            <View style={styles.eventImage}>
                <Image src={image} />
            </View>
        </View>
    );
};

export default PdfDocumentEvent;

PdfDocumentEvent.propTypes = {
    event: PropTypes.shape({        
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
        description: PropTypes.string.isRequired,
    })
};