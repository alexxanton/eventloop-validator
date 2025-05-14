import "react-native-url-polyfill/auto";

import Auth from "./components/Auth";
import { View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Auth />
    </View>
  )
}
