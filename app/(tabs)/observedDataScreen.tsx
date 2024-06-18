import { StyleSheet, ActivityIndicator } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { format } from 'date-fns'
import { useStationContext } from '@/hooks/useStationContext'

type ObservedMeteorologicalData = {
  id: string
  date: Date
  temperature: number
  humidity: number
  station_id: string
}

type ObservedHydrologicalData = {
  id: string
  date: Date
  elevation: number
  flow: number
  accumulated_rain: number
  station_id: string
  climatologicalInterpretation: string
}

export default function ObservedDataScreen() {
  const { station } = useStationContext()

  const [observedHydrologicalData, setObservedHydrologicalData] =
    useState<ObservedHydrologicalData>({} as ObservedHydrologicalData)

  const [observedMeteorologicalData, setObservedMeteorologicalData] =
    useState<ObservedMeteorologicalData>({} as ObservedMeteorologicalData)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://labclim.uea.edu.br/api/hydrological-data/observed/${station.id}`)
      .then((response) => response.json())
      .then((data) => {
        setObservedHydrologicalData(data)
      })
      .catch((e) => console.error(e))

    fetch(`https://labclim.uea.edu.br/api/meteorological-data/observed/${station.id}`)
      .then((response) => response.json())
      .then((data) => {
        setObservedMeteorologicalData(data)
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
        <ThemedText type='title'>
          {station.name}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.generalDataContainer}>
        {observedHydrologicalData.date && (
          <ThemedView style={styles.hydrologicalDataContainer}>
            <ThemedText type='subtitle' style={styles.dataTitle}>
              Dados Hidrológicos:
            </ThemedText>
            <ThemedText type='default'>
              Data do Registro:{' '}
              {format(observedHydrologicalData.date, 'dd/MM/yyyy HH:mm')}
            </ThemedText>
            <ThemedText type='default'>
              Nível do Rio: {observedHydrologicalData.elevation}m
            </ThemedText>
            <ThemedText type='default'>
              Interpretação Climatológica:{' '}
              {observedHydrologicalData.climatologicalInterpretation}
            </ThemedText>
            <ThemedText type='default'>
              Vazão: {observedHydrologicalData.flow} m³/s
            </ThemedText>
            <ThemedText type='default'>
              Chuva Acumulada do Dia:{' '}
              {observedHydrologicalData.accumulated_rain} mm
            </ThemedText>
          </ThemedView>
        )}
        {observedMeteorologicalData.date && (
          <ThemedView style={styles.meteorologicalDataContainer}>
            <ThemedText style={styles.dataTitle} type='subtitle'>Dados Meteorológicos:</ThemedText>
            <ThemedText type='default'>
              Data do Registro:{' '}
              {format(observedMeteorologicalData.date, 'dd/MM/yyyy HH:mm')}
            </ThemedText>
            <ThemedText type='default'>
              Temperatura: {observedMeteorologicalData.temperature}
              °C
            </ThemedText>
            <ThemedText type='default'>
              Umidade: {observedMeteorologicalData.humidity}%
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
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
  meteorologicalDataContainer: {
    marginTop: 20,
  },
  hydrologicalDataContainer: {
    marginBottom: 30,
  },
  dataTitle: {
    marginBottom: 20,
  },
})
