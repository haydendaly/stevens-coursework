import { StyleSheet } from 'react-native';
import { color } from '../functions/providers/ColorContext';

const resourceStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryContainer: {
        borderRadius: 15,
        padding: 5,
        marginTop: 10
    },
    category: {
        fontSize: 20
    },
    contentContainer: {
        width: '95%',
        // borderRadius: 25,
        padding: 5,
        borderTopWidth: 1
    },
    // unused
    dropdownArrow: {
        height: 30,
        width: 30,
        backgroundColor: color.highlight,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        right: 10
    },
    title: {
        fontSize: 18
    },
    source: {
        fontSize: 16
    }
});

export default resourceStyles;
