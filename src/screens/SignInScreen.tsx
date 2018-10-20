import React from "react";
import { View, Button } from "react-native";
import { styles } from "../styles/styles";
import { MonoText } from "../components/StyledText";
import { connect } from "react-redux";
import { google } from "../store/modules/auth/authActions";

const actions = {
  googleRequested: google.request
};

class SignInScreenRaw extends React.Component<typeof actions> {
  static navigationOptions = {
    title: "Please sign in"
  };

  render() {
    return (
      <View style={styles.container}>
        <MonoText>Sign in screen</MonoText>
        <Button title="Sign in!" onPress={this.props.googleRequested} />
      </View>
    );
  }
}

export const SignInScreen = connect(
  undefined,
  actions
)(SignInScreenRaw);
