import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { API_KEY } from "@env"

const Map = () => {
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!origin || !destination) return;
        mapRef.current.fitToSuppliedMarkers(["origin", "destination"])
    }, [origin, destination])

    useEffect(() => {
        if (!origin || !destination) return;
        const getTravelTime = async () => {
            const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial
            &destinations=${destination.description}
            &origins=${origin.description}
            &key=${API_KEY}`
            fetch(URL).
                then((res) => res.json()).
                then(data => (
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
                )).catch((err) => console.log(err))
        }
        getTravelTime()
    }, [origin, destination, API_KEY])

    return (
        <View >
            <MapView style={styles.map}
                ref={mapRef}
                initialRegion={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}>
                {origin && destination && (
                    <MapViewDirections
                        origin={origin.description}
                        destination={destination.description}
                        apikey={API_KEY}
                        strokeColor="black"
                        strokeWidth={3}
                    />
                )}
                {origin?.location && (
                    <Marker
                        coordinate={{
                            latitude: origin.location.lat,
                            longitude: origin.location.lng,
                        }}
                        title="origin"
                        description={origin.description}
                        identifier={"origin"}
                    />
                )}
                {destination?.location && (
                    <Marker
                        coordinate={{
                            latitude: destination.location.lat,
                            longitude: destination.location.lng,
                        }}
                        title="destination"
                        description={destination.description}
                        identifier={"destination"}
                    />
                )}
            </MapView>
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})