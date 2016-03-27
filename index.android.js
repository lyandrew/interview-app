import React, {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import ConfigScreen from './App/Component/ConfigScreen';
import QuestionScreen from './App/Component/QuestionScreen';
import ConfirmScreen from './App/Component/ConfirmScreen';
import ResultScreen from './App/Component/ResultScreen';

var _navigator;
React.BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
    }
    return false;
});

var NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
   switch (route.name) {
    case 'home':
      return null;
    default:
      return (
        <TouchableOpacity
          onPress={() => {navigator.pop();} }>
          <View style={styles.navBarLeftButton}>
            <Text style={styles.navBarButtonText}>{'Back'}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  },
  RightButton: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'question':
        return (
          <View style={styles.navBarRightButton}>
            <Text style={styles.navBarButtonText}>{route.index}</Text>
          </View>
        );
      default:
        return null;
    }
  },

  Title: function(route, navigator, index, navState) {

    switch (route.name) {
      default:
      return (
        <View style={styles.navBarRightButton}>
          <Text style={styles.navBarButtonText}>{route.topic}</Text>
        </View>
      );
    }
  }
};

class SoftwareInterview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topic: '',
      numQuestion: 0,
      questionsIndices: [],
      index: 0,
      score: 0,
    }
  }

  renderScene (route, navigator) {
    _navigator = navigator;
    switch (route.name) {
      case 'home':
        var properties = {
          text: 'Software Engineer Data Structures and Algorithm Practice Questions!',
          direction: 'Select a topic to begin!',
          choices: ['Hash Table', 'Random']
        }
        return (
          <ConfigScreen
            navigator={navigator}
            properties={properties}
            onSelection={ (selection) => {
              this.setState({topic:selection})
              navigator.push({
                name: 'config'
              })
            }}
            />
        );
      case 'config':
        var properties = {
          text: this.state.topic,
          direction: 'Select number of questions',
          choices: ['5', '10', '20']
        }
        return (
          <ConfigScreen
            navigator={navigator}
            properties={properties}
            onSelection={ (selection) => {
              this.setState({numQuestion:selection})
              navigator.push({
                name: 'confirm',
                topic: this.state.topic
              })
            }}
            />
        );
      case 'confirm':
        var properties = {
          state: this.state,
          index: 0
        }
        return (
          <ConfirmScreen
            navigator={navigator}
            properties={properties}
            onConfirm= { (questionsIndicesReturn) => {
              this.setState({questionsIndices:questionsIndicesReturn})
              this.setState({index:0})
              this.setState({score:0})
              navigator.push({
                name: 'question',
                topic: this.state.topic,
                index: this.state.index+1
              })
            }

            }
            />
        );
      case 'question':
        return(
          <QuestionScreen
            navigator={navigator}
            state={this.state}
            onAnswer={ (score, index) => {
              var newScore = this.state.score + score;
              this.setState({score:newScore})
              var newIndex = index +1;
              this.setState({index:newIndex})
            }}
            onConfirm= { () => {
              console.log('numQuestio', parseInt(this.state.numQuestion))
              if (this.state.index !== parseInt(this.state.numQuestion)) {
                navigator.push({
                  name: 'question',
                  topic: this.state.topic,
                  index: this.state.index+1
                })
              } else {
                navigator.push({
                  name: 'result',
                  topic: this.state.topic
                })
              }
            }}
            />
        );
      case 'result':
        return (
          <ResultScreen
            score={this.state.score}
            onConfirm= { () => {
              navigator.popToTop()
            }} />
          );
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{name: 'home'}}
        renderScene={this.renderScene.bind(this)}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
      />
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
  navContainer: {
    flex: 1,
  },
  navBar: {
    backgroundColor: '#29293d',
    borderBottomColor: '#48209A',
    borderBottomWidth: 1
  },
  navBarTitleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  //  marginVertical: 9  // iOS
    marginVertical: 16 // Android
  },
  navBarLeftButton: {
    paddingLeft: 10
  },
  navBarRightButton: {
    paddingRight: 10
  },
  navBarButtonText: {
    color: '#EEE',
    fontSize: 16,
//    marginVertical: 10 // iOS
    marginVertical: 16 // Android
  }
});

AppRegistry.registerComponent('SoftwareInterview', () => SoftwareInterview);
