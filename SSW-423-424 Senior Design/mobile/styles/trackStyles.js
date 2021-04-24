import { StyleSheet } from 'react-native';

const trackStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        height: 40,
        width: 175,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        marginBottom: '5%'
    },
    header: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 0
    },
    headerText: {
        textAlign: 'center',
        fontSize: 32,
        fontFamily: 'regular',
        marginLeft: 25
    },
    sliderspace: {
        height: 125,
        width: '100%',
        marginTop: 20
    }
});

export default trackStyles;
