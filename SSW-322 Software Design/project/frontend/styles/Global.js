import { StyleSheet } from "react-native";

export const Global = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#eee'
    },
    text: {
        marginTop: 50,
        fontSize: 75,
        color: "#235A82",
        fontWeight: "bold"
    },
    subText: {
        fontSize: 28,
        color: "#FFFFFF"
    },
    buttonText: {
        color: "white",
        fontSize: 24,
        fontWeight: "500"
    },
    bottom: {
        flex: 1,
        width: "100%",
        paddingLeft: '14%',
        justifyContent: "flex-end",
        marginBottom: 36
    },
    header: {
        fontSize: 40,
        color: '#141414',
        fontWeight: '600'
    },
    subHeader: {
        fontSize: 22,
        color: '#141414',
        padding: '5%',
        fontWeight: '400',
        textAlign: 'center'
    },
    textContainer: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    doneButton: {
        backgroundColor: '#235A82',
        width: '85%',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    input: {
        width: '60%',
        borderWidth: 2,
        borderColor: 'black',
        margin: 8,
        padding: 18,
        borderRadius: 8,
        fontSize: 24
    },
    headerStyle: {
        backgroundColor: '#235a82',
        shadowOffset: { width:0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    headerTitleStyle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '500',
        borderLeftWidth: 25,
        borderRightWidth: 25,
        alignSelf: 'center'
    },
    clubText: {
        marginTop: "4%",
        fontSize: 24,
        paddingLeft: "4%",
        color: 'black',
        fontWeight: "700",
        marginBottom: "1%"
    },
    bookText: {
        fontSize: 24,
        paddingLeft: "4%",
        color: "black",
        fontWeight: "700",
        marginTop: "4%",
        marginBottom: "1%"
    },
    clubHolder: {
        height: 185,
        backgroundColor: "#155149",
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    clubImage: {
        width: 113.33,
        height: 165,
        borderRadius: 2,
        paddingLeft: 10,
        marginTop: 10
    },
    book: {
        width: 100,
        height: 150,
        borderRadius: 7,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    clubTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: "#fff",
        marginTop: 10
    },
    clubAuthor: {
        justifyContent: "space-between",
        marginTop: 5,
        color: '#e0ffff',
        fontSize: 18,
        fontWeight: "400"
    },
    rectangle:{
        marginTop: 50,
        width: 380,
        height: 100,
        alignItems: 'center',
        backgroundColor:'rgba(180, 180, 180, 0.8)'
    },
});
