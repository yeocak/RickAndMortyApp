import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Characters from './src/screen/Characters';
import Locations from './src/screen/Locations';
import Episodes from './src/screen/Episodes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/Ionicons';
import CustomColors from './themes/CustomColors';
import LinearGradient from 'react-native-linear-gradient';

import { createStackNavigator } from '@react-navigation/stack';

const BottomNav = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <LinearGradient
      start={{ x: -0.5, y: 0.8 }}
      end={{ x: 3, y: 0.3 }}
      colors={[CustomColors.barLeft, CustomColors.barRight, CustomColors.barRight]}
      style={{ height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center" }}
          >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Icons
                name={(route.name == "Characters") ? "person" : (route.name == "Locations") ? "location" : "tv"}
                size={25}
                color={isFocused ? CustomColors.backRed : CustomColors.backBlue}>
              </Icons>
            </View>

          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
}

function AllTabs() {
  return (
    <BottomNav.Navigator tabBar={props => <MyTabBar {...props} />}>
      <BottomNav.Screen name="Characters" component={Characters} options={{
        headerStyle: { backgroundColor: CustomColors.backBlue },
        headerTintColor: 'white'
      }} />
      <BottomNav.Screen name="Locations" component={Locations} options={{
        headerStyle: { backgroundColor: CustomColors.backBlue },
        headerTintColor: 'white'
      }} />
      <BottomNav.Screen name="Episodes" component={Episodes} options={{
        headerStyle: { backgroundColor: CustomColors.backBlue },
        headerTintColor: 'white'
      }} />
    </BottomNav.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AllTabs" component={AllTabs} />
      </Stack.Navigator>
      <StatusBar
      backgroundColor={CustomColors.backBlue}
      />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBack: {
    height: 100,
    width: '100%',
    elevation: 1
  }
});

export default App;
