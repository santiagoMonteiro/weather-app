import { ObservedHydrologicalData } from '@/@types/observed-hydrological-data'
import { Station, STATIONS } from '@/constants/stations'
import { ReactNode, createContext, useEffect, useState } from 'react'

type StationContextData = {
  station: Station
  selectStation: (station: Station) => void
  recentObservedHydrologicalData: ObservedHydrologicalData[]
}

type StationProviderProps = {
  children: ReactNode
}

export const StationContext = createContext({} as StationContextData)

export function StationProvider({ children }: StationProviderProps) {
  const [station, setStation] = useState<Station>({} as Station)
  const [recentObservedHydrologicalData, setRecentObservedHydrologicalData] =
    useState<ObservedHydrologicalData[]>([])

  function selectStation(station: Station) {
    setStation(station)
  }

  useEffect(() => {
    async function getRecentObservedHydrologicalData() {
      const observedData = []

      for await (const station of STATIONS) {
        const stationRequest = await fetch(
          `https://labclim.uea.edu.br/api/hydrological-data/observed/${station.id}`
        )

        const stationData = await stationRequest.json()

        observedData.push(stationData)
      }
      return observedData
    }

    getRecentObservedHydrologicalData().then((data) =>
      setRecentObservedHydrologicalData(data)
    )
  }, [])

  return (
    <StationContext.Provider
      value={{
        station,
        selectStation,
        recentObservedHydrologicalData,
      }}
    >
      {children}
    </StationContext.Provider>
  )
}
