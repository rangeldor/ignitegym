import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';

import { GluestackUIProvider } from "@components/ui/gluestack-ui-provider";
import { Loading } from "@components/Loading";
import { Routes } from "./routes";
import { AuthContextProvider } from "@contexts/AuthContext";
import { ThemeProvider, useTheme } from "@contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

function MainApp() {
  const { theme } = useTheme();

  return (
    <GluestackUIProvider mode={theme}>
      <SafeAreaView className="flex-1 bg-background-0">
        <StatusBar backgroundColor="transparent" style="auto" translucent />

        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });

  return (
    <ThemeProvider>
      {fontsLoaded ? <MainApp /> : <Loading />}
    </ThemeProvider>
  );
}
