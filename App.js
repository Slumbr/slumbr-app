import React from "react";
import { Platform, StatusBar, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./src/navigation/AppNavigator";
import { styles } from "./src/styles/styles";
import { Provider } from "react-redux";
import { configureStore } from "./src/store/configureStore";

const store = configureStore();

// eslint-disable-next-line import/no-default-export
export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </View>
    );
  }

  _loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([
        require("./src/assets/images/robot-dev.png"),
        require("./src/assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./src/assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error); // eslint-disable-line no-console
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
