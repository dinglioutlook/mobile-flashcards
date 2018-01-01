import React from 'react'
import {
  Text,
  View,
  StatusBar,
  AsyncStorage
} from 'react-native'
import { Constants } from 'expo'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import Deck from './components/Deck'
import Card from './components/Card'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import Quiz from './components/Quiz'
import { TabNavigator, StackNavigator } from 'react-navigation'
import initdata from './utils/initdata'
import { DECKS_KEY } from './utils/api'
import { setLocalNotification } from './utils/helper'
import { gray, white, purple } from './utils/colors'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'My Decks',
      tabBarIcon: <MaterialCommunityIcons
                    name='cards'
                    size={24}
                  />
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      tabBarLabel: 'Add A Deck',
      tabBarIcon: <MaterialIcons
                    name='library-add'
                    size={24}
                  />
    }
  }
})

const MainNav = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'My Decks'
    }
  },
  DeckDetail: {
    screen: DeckDetail
  },
  Quiz: {
    screen: Quiz
  },
  Card: {
    screen: Card
  }
})

export default class App extends React.Component {
  componentDidMount(){
    AsyncStorage.getItem(DECKS_KEY)
    .then(() => {
      Object.keys(initdata).forEach((key) => {
        AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
          [key]: initdata[key]
        }))
      })
    });

    setLocalNotification()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text> Mobile Flashcards - for debug </Text>
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
        <MainNav />
      </View>
    );
  }
}
