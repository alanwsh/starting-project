import {TextInput, View, StyleSheet, Alert, Text} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import {useState} from 'react';
import Colors from '../constants/colors';

function StartGameScreen(props){

  const [enteredNumber, setEnteredNumber] = useState('');

  function inputNumber(enteredNumber){
    setEnteredNumber(enteredNumber);
  }

  function confirmInput(){
    const choseNumber = parseInt(enteredNumber);
    if(isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99){
      Alert.alert('Invalid number!','Number has to be a number between 1 and 99',[{text:'OK',style:'desctructive',onPress:resetNumber}])
      return;
    }
    props.startGame(choseNumber);
  }

  function resetNumber(){
    setEnteredNumber('');
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter a number</InstructionText>
        <TextInput keyboardType="number-pad" maxLength={2} autoCapitalize="none" onChangeText={inputNumber} autoCorrect={false} style={styles.inputBox} value={enteredNumber}/>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetNumber}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInput}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer:{
    flex:1,
    marginTop:100,
    alignItems:'center'
  },
  inputBox:{
    height:50,
    width:50,
    fontSize:32,
    borderBottomColor:Colors.accent500,
    borderBottomWidth:2,
    color:Colors.accent500,
    marginVertical:8,
    fontWeight:'bold',
    textAlign:'center',
  },
  buttonsContainer:{
    flexDirection:'row',
    alignItems:'stretch'
  },
  buttonContainer:{
    flex:1
  }
});