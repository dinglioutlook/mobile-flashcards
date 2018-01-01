import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { gray, white } from '../utils/colors'
import { getDeck } from '../utils/api'
import {styles} from '../utils/styles'

export default class DeckDetail extends Component {

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: navigation.state.params.title
    }
  }

  state = {
    deck: {
      title: '',
      questions: []
    }
  }

  componentDidMount() {
    const { title } = this.props.navigation.state.params
    getDeck(title).then((deck) => {
        this.setState({ deck })
    })
  }
  
  componentDidUpdate() {
    const { title } = this.props.navigation.state.params
    getDeck(title).then((deck) => {
        this.setState({ deck })
    })
  }

  render() {
      const { title, questions } = this.state.deck
      return (
        <View style={styles.deckItem}>
          { this.state.deck ? (
          <View>
          <View>
            <Text style={styles.deckHeading}>{title}</Text>
            <Text style={styles.deckSubheading}>{questions.length + `cards`}</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate(
                'Card',
                { title }
              )}
            >
              <Text
                style={styles.buttonText}
              >
                Add Card
              </Text>
            </TouchableOpacity>
            { questions.length > 0
              ? <TouchableOpacity
                  style={[styles.button, styles.addCard]}
                  onPress={() => this.props.navigation.navigate(
                    'Quiz',
                    { questions }
                  )}
                >
                  <Text
                    style={[styles.buttonText, { color: white }]}
                  >
                    Start Quiz
                  </Text>
                </TouchableOpacity>
              : null
            }
          </View>
          </View>
          ):
          (
            <View><Text>Loading...</Text></View>
          )
        }
        </View>
      )
    }
}


