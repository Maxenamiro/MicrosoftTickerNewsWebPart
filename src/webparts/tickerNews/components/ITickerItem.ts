export interface ITickerItem {
  Id: number
  Title: string
  Beschreibung?: string
  Datum: string
  Kategorie: 'Wartung' | 'Information' | 'Störung'
  Link?: string
  Sichtbarkeit: 'Immer' | 'pro Sitzung' | 'Einmalig'
  StartDatum: string
  EndDatum: string
}