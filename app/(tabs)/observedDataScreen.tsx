import { StyleSheet, ActivityIndicator, Image, View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { format } from 'date-fns'
import { useStationContext } from '@/hooks/useStationContext'
import { formatNumericalData } from '@/utils/formatData'
import { ObservedHydrologicalData } from '@/@types/observed-hydrological-data'
import { ObservedMeteorologicalData } from '@/@types/observed-meteorological-data'
import { ClimatologicalInterpretation } from '@/components/ClimatologicalIntepretation'
import { interpretationColors } from '@/constants/intepretation-colors'

export default function ObservedDataScreen() {
  const { station } = useStationContext()

  const [observedHydrologicalData, setObservedHydrologicalData] =
    useState<ObservedHydrologicalData>({} as ObservedHydrologicalData)

  const [observedMeteorologicalData, setObservedMeteorologicalData] =
    useState<ObservedMeteorologicalData>({} as ObservedMeteorologicalData)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(
      `https://labclim.uea.edu.br/api/hydrological-data/observed/${station.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setObservedHydrologicalData(data)
      })
      .catch((e) => console.error(e))

    fetch(
      `https://labclim.uea.edu.br/api/meteorological-data/observed/${station.id}`
    )
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
        {observedHydrologicalData.date && (
          <ThemedView style={styles.hydrologicalDataContainer}>
            <ThemedText type='subtitle' style={styles.dataTitle}>
              Dados Hidrológicos:
            </ThemedText>
            <ThemedText type='defaultSemiBold'>
              {format(observedHydrologicalData.date, 'dd/MM/yyyy HH:mm') + 'h'}
            </ThemedText>
            <View style={styles.innerContainer}>
              <ThemedText type='default'>
                Nível do Rio:{' '}
                {formatNumericalData(observedHydrologicalData.elevation)} m
              </ThemedText>
              <ClimatologicalInterpretation
                interpretation={
                  observedHydrologicalData.climatologicalInterpretation
                }
              />

              <ThemedText type='default'>
                Vazão: {formatNumericalData(observedHydrologicalData.flow)} m³/s
              </ThemedText>
              <ThemedText type='default'>
                Chuva Acumulada do Dia:{' '}
                {observedHydrologicalData.accumulated_rain} mm
              </ThemedText>
            </View>
          </ThemedView>
        )}
        {observedMeteorologicalData.date && (
          <ThemedView style={styles.meteorologicalDataContainer}>
            <ThemedText style={styles.dataTitle} type='subtitle'>
              Dados Meteorológicos:
            </ThemedText>
            <ThemedText type='defaultSemiBold'>
              {format(observedMeteorologicalData.date, 'dd/MM/yyyy HH:mm') +
                'h'}
            </ThemedText>
            <View style={styles.innerContainer}>
              <ThemedText type='default'>
                Temperatura:{' '}
                {formatNumericalData(observedMeteorologicalData.temperature)}
                °C
              </ThemedText>
              <ThemedText type='default'>
                Umidade: {observedMeteorologicalData.humidity}%
              </ThemedText>
            </View>
          </ThemedView>
        )}
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
  mainContainer: {
    flex: 1,
    paddingTop: '20%',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // height: 100
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
  meteorologicalDataContainer: {
    marginTop: 20,
  },
  hydrologicalDataContainer: {
    marginBottom: 30,
  },
  dataTitle: {
    marginBottom: 20,
  },
  innerContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
})
