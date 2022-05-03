import {View, Text, StyleSheet, Alert, FlatList, Dimensions} from 'react-native';
import Title from '../components/ui/Title';
import {useState, useEffect} from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import InstructionText from '../components/ui/InstructionText';
import Card from '../components/ui/Card';
import GuessLogItem from '../components/game/GuessLogItem';
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
  const [guessRound, setGuessRound] = useState([initialGuess]);

  useEffect(()=>{
    if(currentGuess === inputNumber){
      gameIsOver(guessRound.length);
    }
  },[currentGuess]);

  useEffect(()=>{
    minBoundary = 1;
    maxBoundary = 100;
  },[]);

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
    setGuessRound(prevGuessRounds => [newRandNum, ...prevGuessRounds ]);
  }
  let content = (<>
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
  </>);
  const guessRoundLength = guessRound.length;

  const width = Dimensions.get('window').width;
  if(width > 500){
    content = (<>
      <View style={styles.wideButtonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={setNextGuess.bind(this,'lower')}><Ionicons name='md-remove' size={24} color="white"/></PrimaryButton>
        </View>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={setNextGuess.bind(this,'greater')}><Ionicons name='md-add' size={24} color="white"/></PrimaryButton>
        </View>  
      </View>
    </>);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList renderItem={(item)=><GuessLogItem roundNumber={guessRoundLength - item.index} guess={item.item}/>} data={guessRound} keyExtractor={(item)=> item} />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen:{
    flex:1,
    padding:24,
    alignItems:'center'
  },
  instructionText:{
    marginBottom:15
  }, 
  buttonsContainer:{
    flexDirection:'row',
  },
  buttonContainer:{
    flex:1
  },
  listContainer:{
    flex:1,
    padding:16
  },
  wideButtonsContainer:{
    flexDirection:'row',
    alignItems:'center'
  }
});