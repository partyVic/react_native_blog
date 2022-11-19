import React, { useContext, useEffect, useState } from 'react'
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';



const IndexScreen = ({ navigation, route }) => {
  const [count, setCount] = useState(0);

  const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

  //! Header interaction with its screen component
  //! https://reactnavigation.org/docs/header-buttons/
  //! Can overwrite the header which is defined in Stack.Screen
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Button onPress={() => setCount((c) => c + 1)} title={`Update count ${count}`} />
  //     ),
  //   })
  // }, [navigation, count])

  useEffect(() => {
    getBlogPosts()
 
    //! Call a function when focused screen changes
    //! https://reactnavigation.org/docs/function-after-focusing-screen/
    // tells React navigation that anytime this component IndexScreen gains focus 
    // or is like the primary screen on the device,
    // then this callback function right here will be invoked.
    // So inside of there we can add in another call to getBlogPosts.
    const unsuscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      getBlogPosts()
    })
 
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsuscribe

  }, [navigation]) //! remember to put [navigation]


  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.id}

        //! remember to destructure item: {item}
        renderItem={({ item }) => (
          <TouchableOpacity

            //! navigation.navigate('Show', { id: item.id })
            //! set the 'Show' route with different params base on item.id
            //! { id: item.id } id is the params, value is item.id
            onPress={() => navigation.navigate('Show', { id: item.id })}
          >
            <View style={styles.row}>
              <Text style={styles.title}>
                {item.title} - {item.id}
              </Text>
              <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                <Feather style={styles.icon} name="trash" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
})
export default IndexScreen