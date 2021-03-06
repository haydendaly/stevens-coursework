import { StyleSheet } from 'react-native';
import { color } from '../functions/providers/ColorContext';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    button: {
        height: 55,
        width: 55,
        borderRadius: 27.5,
        position: 'absolute',
        bottom: 15,
        right: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signIn: {
        height: 55,
        width: 100,
        borderRadius: 10,
        position: 'absolute',
        bottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 24,
        marginBottom: 30
    },
    subHeaderText: {
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center',
        marginHorizontal: 30
    }
});

export default styles;
