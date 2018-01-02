import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { gray, white } from '../utils/colors'
import { addDeck } from '../utils/api'
import {styles} from '../utils/styles'

export default class Deck extends Component {
    state = {
      deckTitle: ''
    }
  
    resetAction = (title) => {
      return NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({
            routeName: 'Home'
          }),
          NavigationActions.navigate({
            routeName: 'DeckDetail',
            params: { title }
          })
        ]
      })
    }
  
    submit = () => {
      const title = this.state.deckTitle
      addDeck(title)
        .then(() => this.props.navigation.dispatch(this.resetAction(title)))
    }
  
    render() {
      return (
        <View >
          <Text style={styles.showArea}>
            What is the title of your new deck?
          </Text>
          <View>
            <TextInput
              onChangeText={(text) => this.setState({deckTitle: text })}
              value={this.state.deckTitle}
              placeholder='Deck Title'
              autoCapitalize='words'
              autoFocus={true}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={this.submit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

 