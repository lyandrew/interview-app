import React, {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class QuestionScreen extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    console.log(this.props.result)
    if (this.props.result == "Correct"){
      return (
        <View style={styles.container}>
          <Text style={styles.rightText}>Correct: {this.props.explanation}</Text>
          <TouchableHighlight onPress={() => {this.props.onConfirm()}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    } else if (this.props.result == "Incorrect") {
      return (
        <View style={styles.container}>
          <Text style={styles.wrongText}>Incorrect: {this.props.explanation}</Text>
          <TouchableHighlight onPress={() => {this.props.onConfirm()}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (null);
    }

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  rightText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: '500',
    color: 'green'
  },
  wrongText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: '500',
    color: 'red'
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
