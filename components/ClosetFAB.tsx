import { useState } from "react";
import { FAB } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { RootParamList, TabsParamList } from "../navigation/Root";
import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Linking } from "react-native";

type NavigationProps = CompositeNavigationProp<
  MaterialBottomTabNavigationProp<TabsParamList, "Closet", undefined>,
  NativeStackNavigationProp<RootParamList>
>;

const ClosetFAB = () => {
  const { navigate } = useNavigation<NavigationProps>();
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  const openCamera = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      goToAddNewCloth(result.assets[0]);
    }
  };

  const openPhotoLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      if (!result.canceled) {
        goToAddNewCloth(result.assets[0]);
      }
    } else {
      Linking.openSettings();
    }
  };

  const goToAddNewCloth = (image: ImagePicker.ImagePickerAsset) => {
    navigate("Stack", {
      screen: "AddNewCloth",
      params: { image },
    });
  };

  return (
    <FAB.Group
      style={{ marginBottom: -30 }}
      open={open}
      visible
      icon={open ? "close" : "plus"}
      actions={[
        {
          icon: "camera",
          label: "카메라 열기",
          onPress: openCamera,
        },
        {
          icon: "image-album",
          label: "사진 보관함에서 고르기",
          onPress: openPhotoLibrary,
        },
      ]}
      onStateChange={onStateChange}
    />
  );
};

export default ClosetFAB;
