import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const ShowScreen = () => {
    const route = useRoute()

    const { state } = useContext(Context);

    const blogPost = state.find(
        (blogPost) => blogPost.id === route.params.id
    );

    return (
        <View>
            <Text>{blogPost.title}</Text>
            <Text>{blogPost.content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default ShowScreen;