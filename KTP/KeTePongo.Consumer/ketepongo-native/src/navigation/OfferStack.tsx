
import 'react-native-gesture-handler';
import { createStackNavigator } from "react-navigation-stack";
import { SellScreen }  from '../containers/SellScreen';


const TheSellStack = {
    SellScreen: {
        screen: SellScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
}

export default createStackNavigator({
    ...TheSellStack,
})
