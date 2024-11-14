import { ObservedHydrologicalData } from '@/@types/observed-hydrological-data'
import { STATIONS, Station } from '@/constants/stations'
import { useStationContext } from '@/hooks/useStationContext'
import { Link, router } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default function Page() {
  const { selectStation, recentObservedHydrologicalData } = useStationContext()

  function handleOpenStationPage(station: Station) {
    selectStation(station)
    router.push('/(tabs)/observedDataScreen')
  }

  interface CustomMapMarkerProps {
    data: ObservedHydrologicalData | undefined
  }

  function CustomMapMarker({ data }: CustomMapMarkerProps) {
    const interpretation = data?.climatologicalInterpretation
    const elevation = data?.elevation

    const colors = {
      '-3': '#8B0000',
      '-2': '#FF4500',
      '-1': '#FFD700',
      '0': '#00FF00',
      '1': '#00ffd1',
      '2': '#00BFFF',
      '3': '#00008B',
    }

    if (interpretation) {
      return (
        <View style={[styles.markerContainer, { backgroundColor: colors[interpretation] }]}>
          <Text style={styles.markerText}>{elevation?.toFixed(1)}</Text>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -9.9256,
          longitude: -63.0714,
          latitudeDelta: 8,
          longitudeDelta: 8,
        }}
        toolbarEnabled={false}
      >
        {STATIONS.map((station) => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            title={station.name}
            onPress={() => handleOpenStationPage(station)}
          >
            <CustomMapMarker
              data={recentObservedHydrologicalData.find(
                (e) => e.station_id === station.id
              )}
            />
          </Marker> // <CustomMapMarker
          //   key={station.id}
          //   latitude={station.latitude}
          //   longitude={station.longitude}
          //   value={10}
          //   color='blue'
          // />
        ))}
      </MapView>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/labclim-logo-horizontal.png')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
  logoContainer: {
    position: 'absolute',
    bottom: -35,
    right: 5,
    opacity: 0.8,
  },
  markerContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
  },
  markerText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
})
