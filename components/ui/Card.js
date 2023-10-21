

import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

function Card({ children }) {
    return (
        <View style={styles.inputContainer}>{children}</View>
    );
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: 'center',
        padding: 16,
        marginTop: deviceWidth < 380 ? 18: 36,
        backgroundColor: Colors.primary800,
        marginHorizontal: 24,
        borderRadius: 8,
        elevation: 4,
        //IOS Shadow

        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 6,
        shadowOpacity: 0.25,

    },
})