import { StationContext } from '@/contexts/stationContext'
import { useContext } from 'react'

export const useStationContext = () => useContext(StationContext)