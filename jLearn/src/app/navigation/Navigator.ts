import { Platform } from "react-native";
import {
    createBottomTabNavigator,
    createDrawerNavigator,
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer
} from "react-navigation";

import {
    DetailScreen,
    OptionsScreen, SettingsScreen, HomeScreen
} from "../screens";
import { SignInScreen, RegisterScreen, LoadingScreen } from "../../authentication/screens";


const AuthStack = createStackNavigator(
    {
        SignInScreen,
        RegisterScreen
    },
    {
        headerMode: 'none'
    }
)
const HomeStack = createStackNavigator(
    {
        HomeScreen,
        DetailScreen,
        OptionsScreen,
    },
    {
        headerMode: 'none'
    }
);
const MainNavigator = createBottomTabNavigator({ HomeStack, SettingsScreen });

const RootSwitch = createSwitchNavigator({
    AuthLoading: LoadingScreen,
    App: MainNavigator,
    Auth: AuthStack
},
    { initialRouteName: "AuthLoading" }
);
export default createAppContainer(RootSwitch);

