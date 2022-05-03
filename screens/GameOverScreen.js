import {View, Image, Text, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
function GameOverScreen({rounds, inputNumber, startNewGame}){
  const {width, height} = useWindowDimensions();

  let imageSize = 300;
  if(width < 380){
    imageSize = 150;
  }
  if(height < 400){
    imageSize = 80;
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize/2
  }
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={[styles.imageContainer,imageStyle]}>
        <Image style={[styles.image]} source={require('../assets/images/success.png')}/>
      </View>
      <Text style={styles.summaryText}>Your phone used <Text style={styles.highlight}>{rounds}</Text> rounds to guess the number <Text style={styles.highlight}>{inputNumber}</Text></Text>
      <PrimaryButton onPress={startNewGame}>Start New Game</PrimaryButton>
    </View>
  );
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  rootContainer:{
    flex:1,
    padding:24,
    justifyContent:'center',
    alignItems:'center'
  },
  imageContainer:{
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth:3,
    borderColor:Colors.primary800,
    overflow:'hidden',
    margin:36
  },
  image:{
    width:'100%',
    height:'100%'
  },
  summaryText:{
    fontFamily:'open-sans',
    fontSize:20,
    textAlign:'center',
    marginBottom:24
  },
  highlight:{
    fontFamily:'open-sans-bold',
    color:Colors.primary500
  }
});