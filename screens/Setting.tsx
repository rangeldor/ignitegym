import { VStack } from "@components/ui/vstack";
import { useTheme } from "@contexts/ThemeContext";
import { Button, ButtonIcon } from "@components/ui/button";
import { Moon, Sun } from "lucide-react-native";
import { ScreenHeader } from "@components/ScreenHeader";
import { Text } from "@components/ui/text";

export type Theme = "light" | "dark"

export function Setting() {
  const { theme, toggleTheme } = useTheme();
  
  const themeName = theme === 'light' ? 'Claro' : 'Escuro';
  
    return (      
      <VStack className="flex-1 bg-background-100 h-full">      
        <ScreenHeader title="Configurações" />

        <Text className="px-4 py-4 font-bold text-2xl">Tema</Text>

        <VStack className="px-4 w-full items-start">
          <Button variant="solid" size="xl" className="rounded-full p-3.5 w-12 bg-background-900 dark:bg-background-0" onPress={toggleTheme}>
            <ButtonIcon as={theme === 'light' ? Sun : Moon} />
          </Button>
          <Text size="xl" className="font-bold text-center">{themeName}</Text>
        </VStack>  
      </VStack>
    )
}