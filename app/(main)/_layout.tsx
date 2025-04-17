import { COLORS } from '@/constants/Colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Tabs, useRootNavigationState } from 'expo-router';
import { Text } from 'react-native';

export default function AppLayout() {
    const navigationState = useRootNavigationState();

    const getNestedRouteName = (state: any): string | null => {
        if (!state) return null;
        const route = state.routes[state.index];
        if (route.state) {
            return getNestedRouteName(route.state);
        }
        return route.name;
    };

    const currentRouteName = getNestedRouteName(navigationState) ?? '';
    const hideTabBarScreens = ['room'];

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                sceneStyle: {
                    backgroundColor: 'white',
                },
                tabBarStyle: {
                    marginBottom: 8,
                    marginTop: 0,
                    borderTopWidth: 0,
                    elevation: 0,
                    display: hideTabBarScreens.includes(currentRouteName)
                        ? 'none'
                        : 'flex',
                },
                tabBarItemStyle: {
                    alignItems: 'center',
                    flexDirection: 'row',
                },
                tabBarActiveTintColor: COLORS.HIGHLIGHT.DARKEST,
                tabBarInactiveTintColor: COLORS.NEUTRAL.LIGHT.DARK,
            }}
        >
            <Tabs.Screen
                name='(chats)'
                options={{
                    title: 'Chats',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='chatbubble' size={20} color={color} />
                    ),
                    tabBarLabel: tabBarLabel('Chats'),
                    popToTopOnBlur: true,
                }}
            />
            <Tabs.Screen
                name='friends'
                options={{
                    title: 'Friends',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='person-sharp' size={20} color={color} />
                    ),
                    tabBarLabel: tabBarLabel('Friends'),
                }}
            />
            <Tabs.Screen
                name='settings'
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name='gear' size={20} color={color} />
                    ),
                    tabBarLabel: tabBarLabel('Settings'),
                }}
            />
        </Tabs>
    );
}

const tabBarLabel =
    (label: string) =>
    ({ focused }: { focused: boolean }) =>
        (
            <Text
                style={[
                    focused
                        ? {
                              color: COLORS.NEUTRAL.DARK.DARKEST,
                              ...TYPOGRAPHY.ACTION_S,
                          }
                        : {
                              color: COLORS.NEUTRAL.DARK.LIGHT,
                              ...TYPOGRAPHY.BODY_XS,
                          },
                    { paddingTop: 4 },
                ]}
            >
                {label}
            </Text>
        );
