import "./global.css";
import { StatusBar } from "expo-status-bar";
import { useState } from 'react';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';

import { GluestackUIProvider } from "@components/ui/gluestack-ui-provider";
import { Loading } from "@components/Loading";
import { Routes } from "./routes";
import { Button } from "@components/Button";
import { AuthContextProvider } from "@contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular })
  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");

  return (
    <GluestackUIProvider mode={colorMode}>
      <StatusBar backgroundColor="transparent" style='auto' translucent />

      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>

      <Button
        onPress={() => {
          setColorMode(colorMode === "light" ? "dark" : "light");
        }}
        title="Toggle color mode"
      />

    </GluestackUIProvider>
  )
}
