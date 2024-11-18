import { ObservedHydrologicalData } from '@/@types/observed-hydrological-data'
import { interpretationColors } from '@/constants/intepretation-colors'
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

    if (interpretation) {
      return (
        <View
          style={[
            styles.markerContainer,
            { backgroundColor: interpretationColors[interpretation] },
          ]}
        >
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
          </Marker>
        ))}
      </MapView>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/labclim-logo-horizontal.png')}
        />
      </View>
      <View style={styles.labelsContainer}>
        <Image
          style={styles.labels}
          source={require('@/assets/images/labels.png')}
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
  markerText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  markerContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
  },
  labelsContainer: {
    position: 'absolute',
    bottom: 5,
    borderRadius: 20,
  },
  labels: {
    width: 400,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  logo: {
    width: 130,
    height: 50,
    resizeMode: 'contain',
  },
  logoContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    opacity: 0.8
  },
})
