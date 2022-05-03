import {View, StyleSheet, Dimensions} from 'react-native';
import Colors from '../../constants/colors';
function Card({children}){
  return <View style={styles.card}>{children}</View>

}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card:{
    padding:16,
    marginHorizontal:24,
    borderRadius:8,
    elevation: 4, //android only
    //ios only
    shadowColor:'black',
    shadowOffset:{width:0,height:2},
    shadowRadius:6,
    shadowOpacity:0.25,
    //end ios shadow
    marginTop: deviceWidth < 380 ? 18 : 36,
    backgroundColor:Colors.primary800,
    justifyContent:'center',
    alignItems:'center'
  },
});