import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ActivityIndicator, Appbar } from "react-native-paper";
import WebView from "react-native-webview";

const Rules = () => {
  const { goBack } = useNavigation();
  const [loading, setLoading] = useState(true);
  const endLoading = () => setLoading(false);
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="이용약관" />
      </Appbar.Header>
      {loading ? <ActivityIndicator animating /> : null}
      <WebView
        onLoadEnd={endLoading}
        scalesPageToFit
        source={{
          uri: "https://www.notion.so/yxxnhex/b0a2c53b514d438da9ed9c4b7773e9cb",
        }}
      />
    </>
  );
};

export default Rules;
