import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const journalListStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '25%',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        alignSelf: 'center'
    },
    topList: {
        height: '100%',
        width: windowWidth
    },
    entryList: {
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
        paddingBottom: 30
    },
    entry: {
        height: 75,
        width: windowWidth * 0.95,
        borderBottomWidth: 1
    },
    entryTop: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    entryBottom: {
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomWidth: 0
    },
    entryContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    entryTitle: {
        fontFamily: 'medium',
        fontSize: 16,
        marginBottom: 3
    }
});

export default journalListStyles;
