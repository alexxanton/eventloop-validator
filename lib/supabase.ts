import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

type ExpoConfigExtra = {
  supabaseUrl: string;
  supabaseKey: string;
};

const { supabaseUrl, supabaseKey } = Constants.expoConfig?.extra as ExpoConfigExtra;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  localStorage: AsyncStorage,
  detectSessionInUrl: false,
  persistSession: true,
  autoRefreshToken: true,
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
// AppState.addEventListener("change", (state) => {
//   if (state === "active") {
//     supabase.auth.startAutoRefresh()
//   } else {
//     supabase.auth.stopAutoRefresh()
//   }
// })
