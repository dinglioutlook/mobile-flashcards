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
import { addCardToDeck } from '../utils/api'
import {styles} from '../utils/styles'

export default class Card extends Component{
    emptyState = {
      question: '',
      answer: ''
    }
    state = this.emptyState

  submit = () => {
    const { title } = this.props.navigation.state.params
    this.setState(this.emptyState)
    addCardToDeck(title, this.state)
      .then(() => this.props.navigation.goBack())
  }

  render(){
      return (
        <View style = {{flex : 1}}>
            <TextInput 
                onChangeText={(text) => this.setState({ question: text })}
                value={this.state.question}
                placeholder='Question'
                autoFocus={true}
                style={styles.input}
            />
        <TextInput
          onChangeText={(text) => this.setState({ answer: text })}
          value={this.state.answer}
          placeholder='Answer'
          autoFocus={true}
          style={styles.input}
        />
        <TouchableOpacity onPress={this.submit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>                    
          </View>
      )
  }
} 