import { Button } from "@components/Button";
import { Text } from "@components/ui/text";
import { VStack } from "@components/ui/vstack";
import { useTheme } from "@contexts/ThemeContext";

export type Theme = "light" | "dark"

export function Setting() {
    const { toggleTheme } = useTheme();

    return (
        <VStack className="flex-1 bg-background-100 h-full">
            <Text className="mt-16">Settings</Text>

            <Button
                onPress={() => {
                    toggleTheme()
                }}
                title="Toggle color mode"
            />
        </VStack>
    )
}