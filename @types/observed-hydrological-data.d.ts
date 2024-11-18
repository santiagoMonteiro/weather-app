export type ObservedHydrologicalData = {
  id: string
  date: Date
  elevation: number
  flow: number
  accumulated_rain: number
  station_id: string
  climatologicalInterpretation: '-3' | '-2' | '-1' | '0' | '1' | '2' | '3';
}