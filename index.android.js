import React, {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import HomeScreen from './App/Component/HomeScreen';
import ConfigScreen from './App/Component/ConfigScreen';
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
    return null;
  },

  Title: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity>
        <View style={styles.navBarRightButton}>
          <Text style={styles.navBarButtonText}>{'Home'}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

class SoftwareInterview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topic: '',
      numQuestion: 0
    }
  }
  updateTopic(topic) {
    this.setState({topic:topic})
  }
  updateQuestions(number){
    this.setState({numQuestion:number})
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
              this.updateTopic(selection)
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
          choices: ['10', '20', '30']
        }
        return (
          <ConfigScreen
            navigator={navigator}
            properties={properties}
            onSelection={ (selection) => {
              this.updateQuestions(selection)
              navigator.push({
                name: 'begin'
              })
            }}
            />
        );
      case 'begin':
        return (
          <View>
          <Text style={styles.welcome}>
            Software Engineer Data Structures and Algorithm Practice Questions!
          </Text>
          <Text style={styles.welcome}>
            {this.state.topic}
          </Text>
          <Text style={styles.welcome}>
            {this.state.numQuestion}
          </Text>
        </View>
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
