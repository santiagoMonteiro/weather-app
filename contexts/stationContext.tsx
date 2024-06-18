import { Station } from '@/constants/stations'
import { ReactNode, createContext, useState } from 'react'

type StationContextData = {
  station: Station
  selectStation: (station: Station) => void
}

type StationProviderProps = {
  children: ReactNode
}

export const StationContext = createContext({} as StationContextData)

export function StationProvider({ children }: StationProviderProps) {
  const [station, setStation] = useState<Station>({} as Station)

  function selectStation(station: Station) {
    setStation(station)
  }

  return (
    <StationContext.Provider
      value={{
        station,
        selectStation,
      }}
    >
      {children}
    </StationContext.Provider>
  )
}
