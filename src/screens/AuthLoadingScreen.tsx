import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { styles } from "../styles/styles";
import { existingToken } from "../store/modules/auth/authActions";
import { connect } from "react-redux";

const actions = {
  existingTokenRequested: existingToken.request
};

class AuthLoadingScreenRaw extends React.Component<typeof actions> {
  componentDidMount() {
    this.props.existingTokenRequested();
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export const AuthLoadingScreen = connect(
  undefined,
  actions
)(AuthLoadingScreenRaw);
