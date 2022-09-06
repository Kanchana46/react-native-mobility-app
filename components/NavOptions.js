import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { selectOrigin } from '../slices/navSlice';
import { useSelector } from 'react-redux';


const NavOptions = () => {
    const navigation = useNavigation()
    const origin = useSelector(selectOrigin)
    const data = [
        {
            id: "1",
            title: "Get a ride",
            image: "https://links.papareact.com/3pn",
            screen: "MapScreen"
        },
        {
            id: "2",
            title: "Order food",
            image: "https://links.papareact.com/28w",
            screen: "EatsScreen"
        }
    ]

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            horizontal
            renderItem={({ item }) => (
                <TouchableOpacity style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-100 m-2 w-30`}
                    onPress={() => navigation.navigate(item.screen)}
                    disabled={!origin}>
                    <View >
                        <Image
                            style={{ width: 80, height: 60 }}
                            source={{ uri: item.image }} />

                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                            type='antdesign' name="arrowright" color="white" />
                    </View>
                </TouchableOpacity>
            )} />
    )
}

export default NavOptions

const styles = StyleSheet.create({})