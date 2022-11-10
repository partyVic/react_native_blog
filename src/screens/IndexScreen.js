import React, { useContext } from 'react'
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, FlatList } from 'react-native';
import BlogContext from '../context/BlogContext';


const IndexScreen = () => {
  const { data, addBlogPost } = useContext(BlogContext)

  return (
    <View>
      <Text>Index Screen</Text>

      <Button
        title='Add Post'
        onPress={addBlogPost}
      />

      <FlatList
        data={data}
        keyExtractor={(blogPost) => blogPost.title}

        //! remember to destructure item: {item}
        renderItem={({ item }) => (
          <Text>{item.title}</Text>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({

})
export default IndexScreen