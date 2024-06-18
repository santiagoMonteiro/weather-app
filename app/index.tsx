import { STATIONS, Station } from '@/constants/stations'
import { StationProvider } from '@/contexts/stationContext'
import { useStationContext } from '@/hooks/useStationContext'
import { Link, router } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default function Page() {
  const { selectStation } = useStationContext()

  function handleOpenStationPage(station: Station) {
    selectStation(station)
    router.push('(tabs)/observedDataScreen')
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -7.5028,
          longitude: -63.0183,
          latitudeDelta: 11,
          longitudeDelta: 11,
        }}
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
          />
        ))}
      </MapView>
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
})
