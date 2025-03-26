import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Platform } from "react-native";

import { Home } from "@screens/Home";
import { History } from "@screens/History";
import { Exercise } from "@screens/Exercise";
import { Profile } from "@screens/Profile";
import { Setting } from "@screens/Setting";

import { Icon } from "@components/ui/icon";
import { Box } from "@components/ui/box";

import { HistoryIcon, HomeIcon, SettingsIcon, UserCircleIcon } from "lucide-react-native";

type AppRoutes = {
    home: undefined;
    history: undefined;
    exercise: {
        exerciseId: string;
    };
    profile: undefined;
    setting: undefined;
}

export interface AppNavigatorRoutesProps extends BottomTabNavigationProp<AppRoutes> { }

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
    return (
        <Navigator
            screenOptions={{
                animation: 'shift',
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    borderTopWidth: 0,
                    paddingBottom: 10,
                    paddingTop: 10,
                    height: Platform.OS === 'android' ? 60 : 96,
                },
                tabBarBackground: () => (
                    <Box className="absolute bottom-0 left-0 right-0 h-full bg-background-0" />
                )
            }}>

            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => <Icon as={HomeIcon} className={`${focused ? 'text-primary-500' : 'text-secondary-700'}`} size="xl" />
                }}
            />

            <Screen
                name="history"
                component={History}
                options={{
                    tabBarIcon: ({ focused }) => <Icon as={HistoryIcon} className={`${focused ? 'text-primary-500' : 'text-secondary-700'}`} size="xl" />
                }}
            />

            <Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => <Icon as={UserCircleIcon} className={`${focused ? 'text-primary-500' : 'text-secondary-700'}`} size="xl" />
                }}
            />

            <Screen
                name="setting"
                component={Setting}
                options={{
                    tabBarIcon: ({ focused }) => <Icon as={SettingsIcon} className={`${focused ? 'text-primary-500' : 'text-secondary-700'}`} size="xl" />
                }}
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