import { STATIONS, Station } from '@/constants/stations'
import { StationProvider } from '@/contexts/stationContext'
import { useStationContext } from '@/hooks/useStationContext'
import { Link, router } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'
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
          />
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
})
