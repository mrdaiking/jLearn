/**
 * Created by KyNguyenDai
 * Date: 2019/03/18
 */
import * as React from "react";
import { View, Text } from "react-native";
import { NavigationScreenProp, NavigationNavigateActionPayload, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";

interface BaseScreenProps {

}

interface DispatchInjectedProps {

}

interface StateInjectedProps {

}

interface Props extends DispatchInjectedProps, StateInjectedProps, BaseScreenProps {

}

interface State {
    isLoading: boolean
}

class DetailScreen extends React.Component<Props, State> {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Detail Screen</Text>
            </View>
        );
    }
}

export default connect(null, null)(DetailScreen);