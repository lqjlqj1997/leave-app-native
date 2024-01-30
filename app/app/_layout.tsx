import { Tabs } from "expo-router/tabs";
import {
    Briefcase,
    CircleUserRound,
    FlaskConical,
    GalleryVerticalEnd,
    LogOut,
    Tv,
} from "lucide-react-native";
import { getBaseStyle } from "@/lib/style/StyleUtil";
import { MyTabBar } from "@/lib/components/MyTabBar";


export default function MyLayout() {
    const baseStyle = getBaseStyle();
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                // presentation: "modal",
                // animationDuration: 500,
                // animationTypeForReplace: "pop",
                // animation: "fade_from_bottom",
            }}

            sceneContainerStyle={{
                backgroundColor: baseStyle.color.background,
            }}
            tabBar={(prop) => <MyTabBar {...prop}></MyTabBar>}>

            
            <Tabs.Screen
                name="approval"
                options={{
                    title: "Approval",
                    tabBarLabel: () => (
                        <GalleryVerticalEnd
                            color={baseStyle.color.foreground}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: "Account",
                    tabBarLabel: () => (
                        <CircleUserRound color={baseStyle.color.foreground} />
                    ),
                }}
            />
            <Tabs.Screen
                name="leave"
                options={{
                    title: "Dashboard",
                    tabBarLabel: () => (
                        <Tv color={baseStyle.color.foreground} />
                    ),
                }}
            />
            <Tabs.Screen
                name="employee"
                options={{
                    title: "Employee",
                    
                    tabBarLabel: () => (
                        <Briefcase color={baseStyle.color.foreground} />
                    ),
                }}
            />
            <Tabs.Screen
                name="sign-out"
                options={{
                    title: "Sign Out",
                    tabBarLabel: () => (
                        <LogOut color={baseStyle.color.foreground} />
                    ),
                }}
            />
        </Tabs>
    );
}
