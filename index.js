import { registerRootComponent } from "expo";
import { ko, registerTranslation } from "react-native-paper-dates";

import RecoilWrapper from "./RecoilWrapper";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(RecoilWrapper);
registerTranslation("ko", ko);
