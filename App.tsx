import "./global.css";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from 'react';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';

import { GluestackUIProvider } from "@components/ui/gluestack-ui-provider";
import { Center } from "@components/ui/center";
import { Box } from "@components/ui/box";
import { Button, ButtonText } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { Heading } from "@components/ui/heading";
import { Loading } from "@components/Loading";
import { Text } from "@components/ui/text";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular })
  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");

  return (
    <GluestackUIProvider mode={colorMode}>
      <StatusBar style="auto" translucent />

      <SafeAreaView className="bg-background-0 flex-1">
        {fontsLoaded ?
          <Center>
            <Box>
              <Button
                onPress={() => {
                  setColorMode(colorMode === "light" ? "dark" : "light");
                }}
              >
                <ButtonText>Toggle color mode</ButtonText>
              </Button>
            </Box>

            <Card size="md" variant="filled" className="m-3">
              <Heading size="md" className="mb-1">
                Quick Start
              </Heading>
              <Text size="sm">Start building your next project in minutes</Text>
            </Card>
          </Center>
          :
          <Loading />
        }
      </SafeAreaView>
    </GluestackUIProvider>
  )
}
