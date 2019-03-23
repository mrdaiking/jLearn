/**
 * Create by KyNguyenDai
 *
 */
import { isIphoneX } from "react-native-iphone-x-helper";
import { Platform, StatusBar, Dimensions, PixelRatio } from "react-native";
const widthPercentageToDP = (widthPercent: any) => {
    const screenWidth = Dimensions.get('window').width;
    // Convert string input to decimal number
    const elemWidth = parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};

const heightPercentageToDP = (heightPercent: any) => {
    const screenHeight = Dimensions.get('window').height;
    // Convert string input to decimal number
    const elemHeight = parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};
export {
    widthPercentageToDP,
    heightPercentageToDP
};



const { height } = Dimensions.get("window");

export function RF(percent: any) {
    const deviceHeight = isIphoneX()
        ? height - 78 // iPhone X style SafeAreaView size in portrait
        : Platform.OS === "android"
            ? height - StatusBar.currentHeight
            : height;

    const heightPercent = (percent * deviceHeight) / 100;
    return Math.round(heightPercent);
}
