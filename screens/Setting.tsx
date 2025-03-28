import { VStack } from "@components/ui/vstack";
import { useTheme } from "@contexts/ThemeContext";
import { Button, ButtonIcon } from "@components/ui/button";
import { Moon, Sun } from "lucide-react-native";
import { FormControl, FormControlLabel, FormControlLabelText } from "@components/ui/form-control";
import { ScreenHeader } from "@components/ScreenHeader";

export type Theme = "light" | "dark"

export function Setting() {
  const { theme, toggleTheme } = useTheme();
  
  const themeName = theme === 'light' ? 'Claro' : 'Escuro';
  
    return (      
      <VStack className="flex-1 bg-background-100 h-full">      
        <ScreenHeader title="Configurações" />

        <FormControl className="p-4">
          <Button variant="solid" size="lg" className="rounded-full p-3.5 w-12" onPress={toggleTheme}>
            <ButtonIcon as={theme === 'light' ? Sun : Moon} />
          </Button>
          <FormControlLabel>
            <FormControlLabelText size="lg" bold>{themeName}</FormControlLabelText>
          </FormControlLabel>
        </FormControl>  
      </VStack>
    )
}