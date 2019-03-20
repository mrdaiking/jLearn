import { Platform } from "react-native";
import {
    createBottomTabNavigator,
    createDrawerNavigator,
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer
} from "react-navigation";

import LoadingScreen from "../screens/LoadingScreen";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import OptionsScreen from "../screens/OptionsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SignInScreen from "../screens/SignInScreen";
import RegisterScreen from "../screens/RegisterScreen";

const AuthStack = createStackNavigator(
    {
        SignInScreen,
        RegisterScreen
    },
    {
        headerMode: 'none'
    }
)
const HomeStack = createStackNavigator({ DetailScreen, HomeScreen, OptionsScreen });
// const MainTabs = createBottomTabNavigator({ HomeStack, SettingsScreen });
const MainNavigator = createBottomTabNavigator({ HomeStack, SettingsScreen });


//If using 
// const MainNavigator = Platform.select({
//     ios: createBottomTabNavigator({ HomeStack, SettingsScreen }),
//     android: createDrawerNavigator({ HomeStack, SettingsScreen })
// });

const RootSwitch = createSwitchNavigator({
    AuthLoading: LoadingScreen,
    App: MainNavigator,
    Auth: AuthStack
},
    { initialRouteName: "Auth" }
);
export default createAppContainer(RootSwitch);

