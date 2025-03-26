import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme } from "@screens/Setting";
import { THEME_STORAGE } from "@storage/storageConfig";

export async function storageThemeSave(theme: Theme) {
  try {
    await AsyncStorage.setItem(THEME_STORAGE, theme);
  } catch (error) {
    console.error("Erro ao salvar o tema:", error);
  }
}

export async function storageThemeGet(): Promise<Theme> {
  try {
    const theme = await AsyncStorage.getItem(THEME_STORAGE);
    return theme === "light" || theme === "dark" ? theme : "light"; // Retorna "light" se não houver valor salvo
  } catch (error) {
    console.error("Erro ao obter o tema:", error);
    return "light";
  }
}
