import { StyleSheet } from 'react-native';

const profileStyles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%'
    },
    text: {
        paddingVertical: 20,
        textAlign: 'left',
        fontSize: 20,
        marginLeft: 20
    },
    logout: {
        position: 'absolute',
        bottom: 10,
        width: '100%'
    },
    logoutText: {
        textAlign: 'center',
        color: 'red',
        textDecorationLine: 'underline',
        fontSize: 18
    },
    section: {
        width: '95%',
        marginLeft: '2.5%',
        marginTop: 10,
        height: 70,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5%',
        alignItems: 'center'
    },
    sectionHeader: {
        fontSize: 18,
        fontFamily: 'medium'
    },
    fieldRectangle: {
        width: 260,
        height: 30,
        borderRadius: 10,
        alignItems: 'flex-start',
        marginLeft: 100,
        position: 'absolute'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowColor: {
        marginLeft: '2.5%',
        marginRight: '2.5%',
        borderRadius: 10,
        marginTop: 10
    },
    colorHeader: {
        fontSize: 18,
        fontFamily: 'medium',
        marginLeft: 20,
        marginTop: 10
    },
    colorsRectangle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
        paddingTop: 10
    }
});

export default profileStyles;
