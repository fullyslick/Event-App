import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    eventItem: {
        padding: 16,
        borderStyle: 'solid',
        borderWidth: 1,
        fontSize: 12,
        lineHeight: 1.3,
        width: '100%',
        marginTop: 4,
        marginBottom: 4,
        display: 'flex',
        flexDirection: 'row',
    },
    eventLabel: {
        fontWeight: 'bold',
        color: '#3d5a80',
    },
    eventDetails: {
        width: '70%',
        paddingRight: 16
    },
    eventDetailsItem: {
        marginTop: 4,
        marginBottom: 4
    },
    eventImage: {
        width: '30%',
        height: 200
    }
});

export default styles;