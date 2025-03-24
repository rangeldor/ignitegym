import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes';
import { gray } from 'tailwindcss/colors';
import { ModeType } from '@components/ui/gluestack-ui-provider/types';
import { AppRoutes } from './app.routes';
import { useAuth } from '@hooks/useAuth';
import { Loading } from '@components/Loading';

export function Routes({ mode = 'dark' }: { mode?: ModeType; }) {
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: mode === 'dark' ? gray[950] : gray[200],
        }
    };

    const { user, isLoadingUserStorageData } = useAuth();

    if (isLoadingUserStorageData) {
        return <Loading />
    }

    return (
        <NavigationContainer theme={theme}>
            {user.id ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}