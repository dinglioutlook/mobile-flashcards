import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { gray, white , red, green } from '../utils/colors'
import { getDeck } from '../utils/api'
import { clearLocalNotification, setLocalNotification } from '../utils/helper';
import { NavigationActions } from 'react-navigation';
import {styles} from '../utils/styles'

export default class Quiz extends Component {
    static navigationOptions = {
      title: 'Quiz'
    }
  
    emptyState = {
      questions: [],
      index: 0,
      correctCount: 0,
      isShowingAnswer: false
    }
  
    state = this.emptyState
  
    questionsCount = () => (this.state.questions.length)
  
    isFinished = () => (this.state.index === this.questionsCount())
  
    gradeAnswer = (isCorrect = 0) => {
      if (!this.isFinished()) {
        this.setState((prevState) => {
          return {
            index: prevState.index + 1,
            correctCount: prevState.correctCount + isCorrect
          }
        })
      } else {
        clearLocalNotification()
          .then(setLocalNotification)
      }
    }
  
    restartQuiz = () => {
      const { navigation } = this.props
      const { title, questions } = navigation.state.params
      this.setState(
        {
          ...this.emptyState,
          questions: questions
        },
        () => {
          NavigationActions.setParams({
            key: 'Quiz',
            params: { questions }
          })
        }
      )
    }
  
    goBackToDeck = () => {
      const { navigation } = this.props
      const { title, questions } = navigation.state.params
      this.setState(
        {
          ...this.emptyState,
          questions: questions
        },
        () => navigation.goBack()
      )
    }
  
    componentDidMount() {
      const { questions } = this.props.navigation.state.params;
      this.setState({ questions })
    }
  
    render() {
      const {
        questions,
        index,
        isShowingAnswer,
        correctCount
      } = this.state
      const questionsCount = this.questionsCount()
  
      if (questionsCount > 0) {
        if (this.isFinished()) {
          return (
            <View style={styles.quiz}>
              <Text style={styles.question}>
                You finished with {correctCount} / {questionsCount} questions correct.
              </Text>
  
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.restartQuiz}
                >
                <Text style={styles.buttonText}>Restart Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.goBackToDeck}
                >
                  <Text style={styles.buttonText}>Back to Deck</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
        // in answering question
        const { question, answer } = questions[index]
        const shown = isShowingAnswer ? answer : question
        const showButtonText = isShowingAnswer ? 'Show question' : 'Show answer'
  
        return (
          <View style={styles.quiz}>
            <View>
              <Text>Question {index + 1} of {questionsCount}</Text>
              <Text>{correctCount} questions correct</Text>
            </View>
            <View>
              <Text style={styles.question}>{shown}</Text>
              <TouchableOpacity onPress={() => {this.setState({isShowingAnswer: !this.state.isShowingAnswer})}}>
                <Text style={{ color: gray }}>{showButtonText}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.greenButton}
              onPress={() => this.gradeAnswer(1)}
            >
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.redButton}
              onPress={() => this.gradeAnswer(0)}
            >
              <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        )
      }
  
      return (
        <View style={styles.quiz}>
          <Text style={styles.question}>No questions</Text>
        </View>
      )
    }
  }
  