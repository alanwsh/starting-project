import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import {LinearGradient} from 'expo-linear-gradient';
import { useState } from 'react';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [enteredNumber, setEnteredNumber] = useState();
  const [gameOver, setGameOver] = useState(false);

  const [fontsLoaded] = useFonts({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if(!fontsLoaded){
    return <AppLoading />;
  }

  function startGame(inputNumber){
    setEnteredNumber(inputNumber);
  }

  let screen = <StartGameScreen startGame={startGame}/>;
  if(enteredNumber){
    screen = <GameScreen gameIsOver={gameIsOver} inputNumber={enteredNumber}/>;
  }
  if(gameOver){
    screen = <GameOverScreen />
  }
  function gameIsOver(){
    setGameOver(true);
  }
  return (
    <LinearGradient colors={[Colors.primary700,Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground imageStyle={styles.imageBackground} source={require('./assets/images/background.png')} resizeMode="cover" style={styles.rootScreen}>
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex:1
  },
  imageBackground:{
    opacity:0.15
  }
});
