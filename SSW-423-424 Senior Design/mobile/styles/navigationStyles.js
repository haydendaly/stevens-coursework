import { StyleSheet } from 'react-native';
import { color } from '../functions/providers/ColorContext';

// file seems unused

export const navigationStyles = StyleSheet.create({
    icon: {
        paddingRight: 16,
        paddingBottom: 4,
        paddingLeft: 16
    },
    header: {
        backgroundColor: color.primary
    },
    headerTitle: {
        color: color.primaryText,
        fontFamily: 'Medium',
        fontSize: 20,
        width: '100%'
    },
    footer: {
        backgroundColor: color.primary,
        height: "13%"
    }
});
