import React, {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import Dimensions from 'Dimensions';
var jsonfile = require('../questions.json');
import Answer from './Answer.js';
/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

export default class QuestionScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.props.state;
    this.index = this.props.state.index;
    this.questionIndex = this.props.state.questionsIndices[this.index];
    this.questionText = jsonfile.questions[this.questionIndex].question;
    this.answerChoices = jsonfile.questions[this.questionIndex].choices;
    this.answer = jsonfile.questions[this.questionIndex].answer;
    this.explanation = jsonfile.questions[this.questionIndex].explanation;
    this.state.selected = false
    this.state.result = ""
  }
  displayResult (choice) {
    if (choice == this.answer) {
      this.setState({result:'Correct'})
    } else {
      this.setState({result:'Incorrect'})
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.scroll}>
          <View style={{alignItems: 'center', alignSelf: 'stretch',}}>
          <Text style={styles.text}>{this.questionText}</Text>

          {this.answerChoices.map((choice) => {
            return (
              <TouchableHighlight key={choice}
                onPress={() => {
                  if(this.state.selected == false) {
                    this.displayResult(choice);
                    this.setState({selected:true});
                    if (this.answer == choice){
                      this.props.onAnswer(1, this.index);
                    } else {
                      this.props.onAnswer(0, this.index);
                    }
                  }}}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{choice}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
          </View>
          <View style={{alignSelf: 'stretch'}}>
            <Answer
              result={this.state.result}
              answer={this.answer}
              explanation={this.explanation}
              onConfirm={this.props.onConfirm}

               />
          </View>
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 56,
    flexDirection: 'column',
    backgroundColor: '#e0e0eb',
  },
  scroll: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e0e0eb',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: '500',
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    marginBottom: 5,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#29293d',
    height: 44,
    width: 200,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});
