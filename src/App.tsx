import React from "react";
import { Platform, StatusBar, View } from "react-native";
// @ts-ignore
import { AppLoading, Asset, Font, Icon } from "expo";
import { Provider } from "react-redux";
import { AppNavigator } from "./navigation/AppNavigator";
import { styles } from "./styles/styles";
import { configureStore } from "./store/configureStore";
import { setTopLevelNavigator } from "./services/navigation/navigationService";
import { NavigationContainerComponent } from "react-navigation";

const store = configureStore();

interface Props {
  skipLoadingScreen: boolean;
}

export class App extends React.Component<Props> {
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
          <AppNavigator
            ref={(navigator: NavigationContainerComponent) =>
              setTopLevelNavigator(navigator)
            }
          />
        </Provider>
      </View>
    );
  }

  _loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = (error: Error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error); // eslint-disable-line no-console
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
