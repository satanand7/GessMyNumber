import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import NumberContainer from "../components/game/NumberContainer";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundry = 1;
let maxBoundry = 100;

function GameScreen({ userNumber, onGameOver }) {

    function nextGuessHandler(direction) {  // direction =:> lower or 
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert("Dont't lie!,", 'You know that this is wrong...', [
                { text: 'sorry', style: 'cancel' }
            ])
            return;
        }
        if (direction === 'lower') {
            maxBoundry = currentGuess;
        } else {
            minBoundry = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundry, maxBoundry, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRound => [newRndNumber, ...prevGuessRound])
        console.log(minBoundry, maxBoundry);
    }

    const initalGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initalGuess);

    const [guessRounds, setGuessRounds] = useState([initalGuess]);

    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundry = 1;
        maxBoundry = 100;

    }, [])

    let guessRoundsListLenght = guessRounds.length;

    let content = <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher or lower ?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color={'white'} />
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color={'white'} />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>;

    if (width > 500) {
        content =
            <>
                {/* <InstructionText style={styles.instructionText}>Higher or lower ?</InstructionText> */}
                <View style={styles.buttonContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color={'white'} />
                        </PrimaryButton>

                    </View>

                    <NumberContainer>{currentGuess}</NumberContainer>

                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="md-add" size={24} color={'white'} />
                        </PrimaryButton>
                    </View>
                </View>

            </>
    }

    return (<View style={styles.screen}>
        <Title> Opponent's Guess </Title>
        {content}
        <View style={styles.listContainer}>
            {/* {guessRounds.map(guessRound=>{
                return (<Text key={guessRound}>{guessRound}</Text>)
            })} */}
            <FlatList
                data={guessRounds}
                renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLenght = itemData.index} guess={itemData.item} />}
                keyExtractor={(item) => item}
            />
        </View>
    </View>)
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: "row",
    },
    buttonContainerWide:{
        flexDirection:'row',
        alignItems:'center'
    },
    buttonContainer: {
        flex: 1
    },
    instructionText: {
        marginBottom: 12
    },
    listContainer: {
        flex: 1,
        padding: 16
    }

})