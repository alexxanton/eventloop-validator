import "react-native-url-polyfill/auto";
import { View } from "react-native";
import { Main } from "./components/Main";
import { DataProvider } from "./components/DataProvider";

export default function App() {

  return (
    <View style={{ flex: 1 }}>
      <DataProvider>
        <Main />
      </DataProvider>
    </View>
  );
}
