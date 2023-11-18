
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackScreen from "./components/StackScreen";
import BottomTab from "./components/BottomTab";

export default function App() {
  return (
    <NavigationContainer>
      {/* <StackScreen /> */}
      <BottomTab />
    </NavigationContainer>

  );
}

