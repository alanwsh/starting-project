import {View, Text, StyleSheet, Alert} from 'react-native';
import Title from '../components/ui/Title';
import {useState, useEffect} from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import InstructionText from '../components/ui/InstructionText';
import Card from '../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';

function generateNumberBetween(min, max, exclude){
  const randNum = Math.floor(Math.random() * (max - min)) + min;

  if(randNum === exclude){
    return generateNumberBetween(min, max, exclude);
  }else{
    return randNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({inputNumber, gameIsOver}){
  const initialGuess = generateNumberBetween(1,100, inputNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(()=>{
    if(currentGuess === inputNumber){
      gameIsOver();
    }
  },[currentGuess]);

  function setNextGuess(direction){
    if(
      (direction === 'lower' && currentGuess < inputNumber) ||
      (direction === 'greater' && currentGuess > inputNumber)
    ){
      Alert.alert('Dont lie!','You know that this is wrong...',[{text:'Sorry!',style:'cancel'}]);
      return;
    }
    if(direction === 'lower'){
      maxBoundary = currentGuess;
    }else{
      minBoundary = currentGuess + 1;
    }

    const newRandNum = generateNumberBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRandNum);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <View>
          <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={setNextGuess.bind(this,'lower')}><Ionicons name='md-remove' size={24} color="white"/></PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={setNextGuess.bind(this,'greater')}><Ionicons name='md-add' size={24} color="white"/></PrimaryButton>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen:{
    flex:1,
    padding:24
  },
  instructionText:{
    marginBottom:15
  }, 
  buttonsContainer:{
    flexDirection:'row',
  },
  buttonContainer:{
    flex:1
  }
});