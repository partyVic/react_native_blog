import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from './src/screens/IndexScreen';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';
import { Provider as BlogProvider } from './src/context/BlogContext';
import { TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const App = () => {

  //! What is the difference between @react-navigation/stack vs @react-navigation/native-stack?
  //! createNativeStackNavigator has LESS animation effects and customised headers
  //! unless performance issues, always use createStackNavigator
  // https://stackoverflow.com/questions/69064126/what-is-the-difference-between-react-navigation-stack-vs-react-navigation-nati

  // const Stack = createNativeStackNavigator()
  const Stack = createStackNavigator()

  const createPost = navigation => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    )
  }

  return (
    <BlogProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Index"

          //! setUp for global header style
          screenOptions={{
            headerTitleAlign: 'center',
            // headerBackTitle: 'Go Back',
            // headerBackTitleVisible: false,
            // headerTintColor: "green",
            headerStyle: {
              // backgroundColor: 'rgb(20,101,189)'
            }
          }}
        >

          <Stack.Screen
            name="Index"
            component={IndexScreen}
            options={({ navigation }) => ({
              //! This will replace the title of name="Index"
              title: 'Blogs',

              //! header style can be set individually
              headerStyle: {
                backgroundColor: 'rgb(209,215,220)'
              },

              //! Add a customised icon for the header
              headerRight: () => createPost(navigation),
            })}
          />

          <Stack.Screen
            name="Show"
            component={ShowScreen}
            options={({ navigation, route }) => ({
              //! Add a customised icon for the header
              headerRight: () => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Edit', { id: route.params.id })
                  }
                >
                  <EvilIcons name="pencil" size={35} />
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen
            name='Create'
            component={CreateScreen}
          />

          <Stack.Screen
            name='Edit'
            component={EditScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BlogProvider >
  )
}

export default App;
