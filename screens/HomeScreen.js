import { StyleSheet, Text, View, SafeAreaView, Image, Button } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { useDispatch } from "react-redux"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { setDestination, setOrigin } from '../slices/navSlice';
import { API_KEY } from "@env"
import NavFavorites from '../components/NavFavorites';

const HomeScreen = () => {

    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full `}>
            <View style={tw`pl-12 pt-16`}>
                <Image source={require('../assets/images/uber.png')}
                    style={{ width: 70, height: 25, resizeMode: 'contain' }} />
                <View style={tw`pt-5`}>
                    <GooglePlacesAutocomplete
                        placeholder='Where from?'
                        nearbyPlacesAPI='GooglePlacesSearch'
                        keyboardShouldPersistTaps="handled"
                        fetchDetails={true}
                        debounce={400}
                        styles={{
                            container: { flex: 0 },
                            textInput: { fontSize: 18 }
                        }}
                        minLength={2}
                        enablePoweredByContainer={false}
                        query={{
                            key: API_KEY,
                            language: 'en',
                        }}
                        onPress={(data, details = null) => {
                            dispatch(setOrigin({
                                location: details.geometry.location,
                                description: data.description
                            }))
                            dispatch(setDestination(null))
                        }}
                    />
                    <NavOptions />
                    <NavFavorites />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: "blue"
    }
})