import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes';
import { gray } from 'tailwindcss/colors';
import { ModeType } from '@components/ui/gluestack-ui-provider/types';
import { AppRoutes } from './app.routes';
import { useContext } from 'react';
import { AuthContext } from '@contexts/AuthContext';
import { useAuth } from '@hooks/useAuth';

export function Routes({ mode = 'dark' }: { mode?: ModeType; }) {
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: mode === 'dark' ? gray[950] : gray[200],
        }
    };

    const { user } = useAuth()

    console.log("USUÁRIO LOGADO =>", user);

    return (
        <NavigationContainer theme={theme}>
            <AuthRoutes />
        </NavigationContainer>
    );
}