import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
    marginBottom: 4,
    marginTop: 4,
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
  },
  totals: {
    marginBottom: 4,
    marginTop: 4,
    fontSize: 14,
  },
  eventList: {
    marginTop: 8,
    marginBottom: 8,
  },
});

export default styles;
