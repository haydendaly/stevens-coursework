import { StyleSheet } from 'react-native';

const introStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    headerText: {
        fontSize: 24
    },
    subHeaderText: {
        fontSize: 20
    },
    bodyText: {
        fontSize: 15,
        textAlign: 'center',
        width: '75%'
    },
    underlineText: {
        textDecorationLine: 'underline'
    }
});

export default introStyles;
