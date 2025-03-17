import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';

import { Home } from "@screens/Home";
import { History } from "@screens/History";
import { Exercise } from "@screens/Exercise";
import { Profile } from "@screens/Profile";
import { useColorScheme } from 'nativewind';
import { gray, green, black, white } from 'tailwindcss/colors';
import { Platform } from "react-native";

type AppRoutes = {
    home: undefined;
    history: undefined;
    exercise: undefined;
    profile: undefined;
}

export interface AppNavigatorRoutesProps extends BottomTabNavigationProp<AppRoutes> { }

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
    const iconSize = 24

    const { colorScheme } = useColorScheme();
    const activeTintColor = colorScheme === 'dark' ? green[600] : green[800]
    const inactiveTintColor = colorScheme === 'dark' ? gray[600] : gray[800]
    const tabBackgroundColor = colorScheme === 'dark' ? black : white

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: activeTintColor,
                tabBarInactiveTintColor: inactiveTintColor,
                tabBarStyle: {
                    backgroundColor: tabBackgroundColor,
                    borderTopWidth: 0,
                    paddingBottom: 10,
                    paddingTop: 10,
                    height: Platform.OS === 'android' ? 60 : 96,
                }
            }}>
            <Screen
                name="home"
                component={Home}
                options={{ tabBarIcon: ({ color }) => <HomeSvg fill={color} width={iconSize} height={iconSize} /> }}
            />

            <Screen
                name="history"
                component={History}
                options={{ tabBarIcon: ({ color }) => <HistorySvg fill={color} width={iconSize} height={iconSize} /> }}
            />

            <Screen
                name="profile"
                component={Profile}
                options={{ tabBarIcon: ({ color }) => <ProfileSvg fill={color} width={iconSize} height={iconSize} /> }}
            />

            <Screen
                name="exercise"
                component={Exercise}
                options={{
                    tabBarItemStyle: {
                        display: 'none'
                    }
                }}
            />
        </Navigator>
    )
}