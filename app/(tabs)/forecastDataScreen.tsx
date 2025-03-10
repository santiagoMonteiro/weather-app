import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Image,
  View,
} from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { format } from 'date-fns'
import { useStationContext } from '@/hooks/useStationContext'
import { formatNumericalData } from '@/utils/formatData'
import { ForecastHydrologicalData } from '@/@types/forecast-hydrological-data'
import { ClimatologicalInterpretation } from '@/components/ClimatologicalIntepretation'

export default function ObservedDataScreen() {
  const { station } = useStationContext()

  const [forecastHydrologicalData, setForecastHydrologicalData] = useState<
    ForecastHydrologicalData[]
  >([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(
      `https://labclim.uea.edu.br/api/hydrological-data/forecast/${station.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setForecastHydrologicalData(data)
        setLoading(false)
      })
      .catch((e) => console.error(e))
  }, [])

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={Colors.light.background} />
      </ThemedView>
    )
  }

  return (
    <ThemedView style={styles.mainContainer}>
      <ThemedView style={styles.titleContainer}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/uea.png')}
        />
        <ThemedText type='title'>{station.name}</ThemedText>
        <Image
          style={styles.logo}
          source={require('@/assets/images/labclim-logo.png')}
        />
      </ThemedView>

      <ThemedView style={styles.generalDataContainer}>
        <ThemedView style={styles.hydrologicalDataContainer}>
          <ThemedText type='subtitle' style={styles.hydrologicalDataTitle}>
            Previsão Hidrológica:
          </ThemedText>
          {forecastHydrologicalData.map((forecastRegister) => (
            <ThemedView
              key={forecastRegister.id}
              style={styles.forecastRegisterContainer}
            >
              <ThemedText type='defaultSemiBold'>
                {format(forecastRegister.date, 'dd/MM/yyyy')}
              </ThemedText>
              <View style={styles.innerContainer}>
                <ThemedText type='default'>
                  Nível do Rio:{' '}
                  {formatNumericalData(forecastRegister.elevation)} m
                </ThemedText>
                <ClimatologicalInterpretation
                  interpretation={forecastRegister.climatologicalInterpretation}
                />
                <ThemedText type='default'>
                  Vazão: {formatNumericalData(forecastRegister.flow)} m³/s
                </ThemedText>
              </View>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forecastRegisterContainer: {
    marginBottom: 20,
  },
  mainContainer: {
    flex: 1,
    paddingTop: '20%',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generalDataContainer: {
    flex: 1,
    marginTop: 50,
  },
  hydrologicalDataContainer: {
    marginBottom: 30,
  },
  hydrologicalDataTitle: {
    marginBottom: 20,
  },
  innerContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
})
