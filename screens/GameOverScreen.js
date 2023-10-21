import { View, Image, StyleSheet, Text, useWindowDimensions, ScrollView } from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useEffect, useState } from "react";

function GameOverSceen({roundsNumber, userNumber, onStartNewGame}) {

    const {height, width} = useWindowDimensions();

    let imageSize = 300;


    if(width < 380){
        imageSize = 150;
    }

    if(height < 450){
        imageSize = 150;
    }


    const imageStyle = {
        width:imageSize,
        height:imageSize,
        borderRadius: imageSize / 2
    }

    console.log(imageStyle);

    return (
        <ScrollView style={styles.screen}>

        <View style={styles.rootContainer}>
            <Title>Game Over</Title>
            <View style={[styles.imageContainer, imageStyle]}>
                <Image style={styles.image} source={require('../assets/images/success.png')} />
            </View>
            <Text style={styles.summeryText}>
                Your phone needed <Text style={styles.highlight}> {roundsNumber} </Text> 
                rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.
            </Text>
            <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
        </ScrollView>
    )
}

export default GameOverSceen;

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    screen:{
        flex:1 
    },
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageContainer: {
        // borderRadius: deviceWidth < 380 ? 75 : 150,
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summeryText:{
        fontFamily:'open-sans',
        fontSize: 24,
        textAlign:'center',
        marginBottom:24

    },
    highlight: {
        fontFamily:'open-sans-bold',
        color:Colors.primary500
    }
});