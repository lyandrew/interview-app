import React, {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

var jsonfile = require('../questions.json');

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

export default class ConfirmScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.props.properties.state;
    this.index = this.props.properties.index;
    this.arrayIndex = []
  }
  _gatherData(state) {
    var questionList;
    if (state.topic === 'Random') {
      questionList = Array(Object.keys(jsonfile.questions).length).fill().map((x,i)=>i.toString())

    } else {
      questionList = []
      // push all indices that tag contains the topic
      for (var i in jsonfile.questions) {
        for (var j in jsonfile.questions[i].tags) {
          if (jsonfile.questions[i].tags[j] == state.topic) {
            questionList.push(i)
          }
        }
      }
    }
    console.log(questionList)
    shuffle(questionList)
    questionList = questionList.slice(0, this.state.numQuestion)
    return questionList
  }
  render () {

    var questionList = this._gatherData(this.state)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Topic: {this.state.topic}
        </Text>
        <Text style={styles.text}>
          Number of Questions: {this.state.numQuestion}
        </Text>
        <TouchableHighlight onPress={() => this.props.onConfirm(questionList)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Confirm</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0eb',
    alignSelf: 'stretch',
    marginTop: 56
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
    backgroundColor: 'green',
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
