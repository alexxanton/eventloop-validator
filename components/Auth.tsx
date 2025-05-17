import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { User, Session } from "@supabase/supabase-js";
import QRScanner from "./QRScanner";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const stored = await AsyncStorage.getItem("supabase.session");
      if (stored) {
        const session: Session = JSON.parse(stored);
        supabase.auth.setAuth(session.access_token);
        setUser(session.user);
        console.log("Session loaded:", session.user);
      } else {
        const current = supabase.auth.session();
        setUser(current?.user ?? null);
        console.log("Current session:", current?.user);
      }
    };
    loadSession();
  }, []);

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.api.signInWithEmail(email, password);
    if (error) Alert.alert(error.message);

    if (data) {
      await AsyncStorage.setItem("supabase.session", JSON.stringify(data));
      setUser(data.user);
      console.log("Logged in:", data.user);
    }

    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { user, session, error } = await supabase.auth.signUp({ email, password });

    if (error) Alert.alert(error.message);
    if (!user) Alert.alert("Check your inbox to verify your email");

    if (session) {
      await AsyncStorage.setItem("supabase.session", JSON.stringify(session));
      setUser(user);
    }

    setLoading(false);
  }

  if (user) return <QRScanner />;

  return (
    <View style={styles.container}>
      <View>
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
          <Button title="Sign in" disabled={loading} onPress={signInWithEmail} />
        </View>
        <View style={styles.verticallySpaced}>
          <Button title="Sign up" disabled={loading} onPress={signUpWithEmail} />
        </View>
      </View>
    </View>
  );
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
