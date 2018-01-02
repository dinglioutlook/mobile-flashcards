import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { white, gray } from '../utils/colors'
import { getDecks } from '../utils/api'
import {styles} from '../utils/styles'

export default class DeckList extends Component {
  state = {
    decks: []
  }

  componentDidMount() {
    getDecks().then((decks) => {
      this.setState({ decks })
    })
  }
 
  // navigation back, need to reload
  componentDidUpdate() {
    getDecks().then((decks) => {
        this.setState({ decks })
    })
  }

  deckNumber = (title) => {
    const deck =  this.state.decks.filter((deck) => deck.title === title)[0];

    if (deck)
    {
      const count = deck.questions.length
      return `${count} card`
    }
    else{
      //should not happen
      return `no card`
    } 
  }

  render() {
    const { decks } = this.state
      return (
        decks.length === 0 ? (
        <View>
          <Text>No decks yet</Text>
        </View>
      )
    :
     (
      <FlatList
        data={this.state.decks}
        keyExtractor={(item, index) => item.title}
        renderItem={({ item }) => {
          const { title } = item
          return (
            <View style={styles.deckItem}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate(
                    'DeckDetail',
                    { title }
                  )
                }}
              >
                <Text style={styles.showAreaH1}>
                  {title}
                </Text>
                <Text style={styles.showArea}>{this.deckNumber(title)}
                </Text>
                
              </TouchableOpacity>
            </View>
          )
        }}
      />
    )
  )
  }
}

