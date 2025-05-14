import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { User } from "@supabase/supabase-js";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null | undefined>(null);

  useEffect(() => {
    setUser(supabase.auth.session()?.user);
  }, []);

  async function signInWithEmail() {
    setLoading(true)
    const { error, data } = await supabase.auth.api.signInWithEmail(email, password);
    setUser(data?.user);
    console.log(data?.user)

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      user,
      error
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!user) Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View>
        {user && <Text>{user.id}</Text>}
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            label="Email"
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
          />
        </View>
      </View>
      <View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
        </View>
        <View style={styles.verticallySpaced}>
          <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
