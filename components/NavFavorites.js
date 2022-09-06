import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import tw from 'twrnc';

const data = [
    {
        id: "1",
        icon: "home",
        location: "Home",
        destination: "Code Street, London, UK"
    },
    {
        id: "2",
        icon: "briefcase",
        location: "Work",
        destination: "London Eye, London, UK"
    }
]

const NavFavorites = () => {
    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => (
                <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
            )}
            renderItem={({ item: { location, destination, icon } }) => (
                <TouchableOpacity style={tw`flex-row items-center p-5`}>
                    <Icon
                        styles={tw`rounded-full bg-gray-300 p-3`}
                        name={icon}
                        type="ionicon"
                        size={28}
                    />
                    <View>
                        <Text styles={tw`font-semibold text-lg`}>{location}</Text>
                        <Text styles={tw`text-gray-500`}>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )} />
    )
}

export default NavFavorites

const styles = StyleSheet.create({})