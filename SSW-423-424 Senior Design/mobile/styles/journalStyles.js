import { StyleSheet } from 'react-native';

const journalStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    topnav: {
        flexDirection: 'row',
        paddingVertical: 45,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 70,
        justifyContent: 'space-between'
    },
    topnavLeft: {
        flexDirection: 'row'
    },
    middle: {
        textAlign: 'left',
        marginLeft: 10,
        marginRight: 10,
        marginTop: -90
    },
    notesui: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    headtext: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    regtext: {
        fontSize: 20
    },
    bluetext: {
        color: 'blue',
        fontSize: 18,
        textAlign: 'center',
        padding: 10
    },
    redtext: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        padding: 10
    },
    trigger: {
        padding: 3
    }
});

export default journalStyles;
