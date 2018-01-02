import {
    StyleSheet
  } from 'react-native'
import { gray, white, green, red } from './colors'


export const styles = StyleSheet.create({
    button: {
      paddingTop: 20,
      paddingBottom: 20,
      width: 200,
      backgroundColor: gray,
      borderColor: gray,
      borderWidth: 2,
      borderRadius: 6,
      marginTop: 10
    },
    buttonText: {
      textAlign: 'center',
      color: white
    },
    input: {
      width: 300,
      borderWidth: 1,
      borderRadius: 6,
      fontSize: 16,
      padding: 5,
      marginBottom: 10
    },
    deckHeading: {
        textAlign: 'center',
        fontSize: 36
      },
    deckSubheading: {
        textAlign: 'center',
        fontSize: 24,
        color: gray
      },
      addCard: {
        backgroundColor: gray
      },
      deckItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      quiz: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      question: {
        textAlign: 'center',
        fontSize: 24
      },
      showArea: {
          fontSize: 24,
          alignItems: 'center'
      },
      showAreaH1:{
        fontSize: 26,
        alignItems: 'center'
      },
      redButton:{
        paddingTop: 20,
        paddingBottom: 20,
        width: 200,
        backgroundColor: red,
        borderColor: gray,
        borderWidth: 2,
        borderRadius: 6,
        marginTop: 10
      },
      greenButton:{
        paddingTop: 20,
        paddingBottom: 20,
        width: 200,
        backgroundColor: green,
        borderColor: gray,
        borderWidth: 2,
        borderRadius: 6,
        marginTop: 10
      }      
  })
