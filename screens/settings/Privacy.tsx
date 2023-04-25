import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ActivityIndicator, Appbar } from "react-native-paper";
import WebView from "react-native-webview";

const Privacy = () => {
  const [loading, setLoading] = useState(true);
  const endLoading = () => setLoading(false);
  const { goBack } = useNavigation();
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="개인정보처리방침" />
      </Appbar.Header>
      {loading ? <ActivityIndicator animating /> : null}
      <WebView
        onLoadEnd={endLoading}
        scalesPageToFit
        source={{
          uri: "https://yxxnhex.notion.site/e486a7e58e994e80844fa776af21c11e",
        }}
      />
    </>
  );
};

export default Privacy;
