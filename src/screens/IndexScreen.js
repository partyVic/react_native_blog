import React, { useContext, useEffect, useState } from 'react'
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';



const IndexScreen = ({ navigation, route }) => {
  const [count, setCount] = useState(0);

  const { state, deleteBlogPost } = useContext(Context);

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

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}

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