import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexScreen from './src/screens/IndexScreen';
import { BlogProvider } from './src/context/BlogContext';




const App = () => {
  const Stack = createNativeStackNavigator()

  return (
    <BlogProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Index" screenOptions={{ headerTitleAlign: 'center' }}>
          <Stack.Screen
            name="Index"
            component={IndexScreen}
            options={{ title: 'Blogs' }} //! This will replace the title of name="Index"
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BlogProvider>
  )
}

export default App;
