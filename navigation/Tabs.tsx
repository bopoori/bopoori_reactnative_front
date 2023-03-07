import React from "react";
import Closet from "../screens/tabs/Closet";
import Home from "../screens/tabs/Home";
import My from "../screens/tabs/My";
import Tips from "../screens/tabs/Tips";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { TabsParamList } from "./Root";

const Tab = createMaterialBottomTabNavigator<TabsParamList>();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Closet"
        component={Closet}
        options={{
          tabBarLabel: "Closet",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "dresser" : "dresser-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tips"
        component={Tips}
        options={{
          tabBarLabel: "Tips",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "lightbulb" : "lightbulb-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My"
        component={My}
        options={{
          tabBarLabel: "My",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account" : "account-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
