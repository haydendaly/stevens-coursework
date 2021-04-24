import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const analysisStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    graph: {
        width: windowWidth * 0.925,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    }
});

export default analysisStyles;
