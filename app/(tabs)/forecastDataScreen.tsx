import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { format } from 'date-fns'
import { useStationContext } from '@/hooks/useStationContext'

type ForecastHydrologicalData = {
  id: string
  date: Date
  elevation: number
  flow: number
  station_id: string
  climatologicalInterpretation: string
}

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
        <ThemedText type='title'>{station.name}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.generalDataContainer}>
        <ThemedView style={styles.hydrologicalDataContainer}>
          <ThemedText type='subtitle' style={styles.hydrologicalDataTitle}>
            Dados Hidrológicos:
          </ThemedText>
          {forecastHydrologicalData.map((forecastRegister) => (
            <ThemedView
              key={forecastRegister.id}
              style={styles.forecastRegisterContainer}
            >
              <ThemedText type='default'>
                Data do Registro:{' '}
                {format(forecastRegister.date, 'dd/MM/yyyy HH:mm')}
              </ThemedText>
              <ThemedText type='default'>
                Nível do Rio: {forecastRegister.elevation}m
              </ThemedText>
              <ThemedText type='default'>
                Interpretação Climatológica:{' '}
                {forecastRegister.climatologicalInterpretation}
              </ThemedText>
              <ThemedText type='default'>
                Vazão: {forecastRegister.flow} m³/s
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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
})
