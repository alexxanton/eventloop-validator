import "react-native-url-polyfill/auto";

import { View } from "react-native";
import { Session, User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useData } from "./DataProvider";
import { supabase } from "../lib/supabase";
import { Auth } from "./Auth";
import { QRScanner } from "./QRScanner";

export function Main() {
  const { user, setUser } = useData();

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

  return (
    <View style={{ flex: 1 }}>
      {!user ? <Auth /> : <QRScanner />}
    </View>
  );
}
