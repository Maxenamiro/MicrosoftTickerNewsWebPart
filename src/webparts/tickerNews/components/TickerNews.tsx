import { spfi, SPFx } from '@pnp/sp'
import '@pnp/sp/items'
import '@pnp/sp/lists'
import '@pnp/sp/webs'
import { Accordion } from '@pnp/spfx-controls-react/lib/controls/accordion'
import * as React from 'react'
import { ITickerNewsProps } from './ITickerNewsProps'
import styles from './TickerNews.module.scss'

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

export default function TickerNews(props: ITickerNewsProps) {
	const sp = React.useMemo(
		() =>
			spfi('https://aonicdemotenant.sharepoint.com/sites/Merck').using(
				SPFx(props.context)
			),
		[props.context]
	)

	const [items, setItems] = React.useState<ITickerItem[]>([])
	const [sessionId, setSessionId] = React.useState<string>('')

	const isTickerNewsPage = () => {
		if (typeof window === 'undefined') return false
		return window.location.href.indexOf('/SitePages/TickerNews.aspx') > -1
	}

	React.useEffect(() => {
		let currentSessionId = sessionStorage.getItem('tickerSessionId')
		if (!currentSessionId) {
			currentSessionId =
				Date.now().toString() + Math.random().toString(36).substr(2, 9)
			sessionStorage.setItem('tickerSessionId', currentSessionId)
		}
		setSessionId(currentSessionId)

		loadData()
	}, [])

	const loadData = async () => {
		try {
			const response = await sp.web.lists
				.getByTitle('TickerNewsList')
				.items.select(
					'Id',
					'Title',
					'Kategorie',
					'Beschreibung',
					'Datum',
					'Link',
					'Sichtbarkeit',
					'StartDatum',
					'EndDatum'
				)()

			console.log('Raw response from SharePoint:', response)

			const mappedItems: ITickerItem[] = response.map((item: any) => {
				return {
					Id: item.Id,
					Title: item.Title,
					Beschreibung: item.Beschreibung,
					Datum: item.Datum,
					Kategorie: item.Kategorie,
					Link: item.Link?.Url || item.Link,
					Sichtbarkeit: item.Sichtbarkeit,
					StartDatum: item.StartDatum,
					EndDatum: item.EndDatum,
				}
			})

			setItems(mappedItems)
			console.log('Mapped tickers:', mappedItems)
		} catch (err) {
			console.error('Error loading TickerNews:', err)
		}
	}

	const formatDate = (dateString: string) => {
		if (!dateString) return ''

		try {
			if (dateString.indexOf('.') > -1) {
				const parts = dateString.split('.')
				const day = parts[0]
				const month = parts[1]
				return day + '.' + month
			}

			const date = new Date(dateString)
			if (isNaN(date.getTime())) return ''

			const day = date.getDate().toString()
			const month = (date.getMonth() + 1).toString()

			const formattedDay = day.length === 1 ? '0' + day : day
			const formattedMonth = month.length === 1 ? '0' + month : month

			return formattedDay + '.' + formattedMonth
		} catch {
			return ''
		}
	}

	const isVisible = (ticker: ITickerItem) => {
		const now = new Date()
		const startDate = new Date(ticker.StartDatum)
		const endDate = new Date(ticker.EndDatum)

		const isWithinDateRange = now >= startDate && now <= endDate

		if (!isWithinDateRange) return false

		const key = `tickerDismissed_${ticker.Id}`

		switch (ticker.Sichtbarkeit) {
			case 'Immer':
				return true
			case 'pro Sitzung':
				const sessionKey = `tickerDismissed_${ticker.Id}_${sessionId}`
				return !sessionStorage.getItem(sessionKey)
			case 'Einmalig':
				return !localStorage.getItem(key)
			default:
				return true
		}
	}

	const dismissTicker = (ticker: ITickerItem) => {
		const key = `tickerDismissed_${ticker.Id}`

		switch (ticker.Sichtbarkeit) {
			case 'pro Sitzung':
				const sessionKey = `tickerDismissed_${ticker.Id}_${sessionId}`
				sessionStorage.setItem(sessionKey, '1')
				break
			case 'Einmalig':
				localStorage.setItem(key, '1')
				break
		}
		setItems([...items])
	}

	const getColor = (category: string) => {
		switch (category?.toLowerCase()) {
			case 'wartung':
				return '#FFEECB'
			case 'information':
				return '#D9F5F7'
			case 'störung':
				return '#FFE4EB'
			default:
				return '#ffffff'
		}
	}

	const getBorderColor = (category: string) => {
		switch (category?.toLowerCase()) {
			case 'wartung':
				return '#FDB321'
			case 'information':
				return '#2DBECD'
			case 'störung':
				return '#E61E50'
			default:
				return 'transparent'
		}
	}

	const getIcon = (category: string) => {
		switch (category?.toLowerCase()) {
			case 'wartung':
				return '/sites/Merck/SiteAssets/TickerNews/Wartung.png'
			case 'information':
				return '/sites/Merck/SiteAssets/TickerNews/Information.png'
			case 'störung':
				return '/sites/Merck/SiteAssets/TickerNews/Störung.png'
			default:
				return ''
		}
	}

	const activeTickers = items.filter(isVisible)
	const pastTickers = items.filter((t) => new Date(t.EndDatum) < new Date())

	return (
		<section className={styles.tickerNews}>
			{activeTickers.length === 0 && (
				<div className={styles.noTickers}>Keine aktiven Ticker-News</div>
			)}

			{activeTickers.map((t, i) => (
				<div
					key={t.Id}
					className={styles.tickerLine}
					style={{
						backgroundColor: getColor(t.Kategorie),
						borderTop: `1px solid ${getBorderColor(t.Kategorie)}`,
						borderBottom: `1px solid ${getBorderColor(t.Kategorie)}`,
					}}
				>
					<img
						src={getIcon(t.Kategorie)}
						className={styles.icon}
						alt={t.Kategorie}
					/>
					<div className={styles.textBlock}>
						{t.Datum && (
							<div className={styles.date}>{formatDate(t.Datum)} /</div>
						)}
						<div className={styles.title}>{t.Title}</div>
						{t.Beschreibung && (
							<div className={styles.message}>{t.Beschreibung}</div>
						)}
						{t.Link && (
							<a
								className={styles.links}
								href={t.Link}
								target='_blank'
								rel='noopener noreferrer'
							>
								Mehr
							</a>
						)}
					</div>

					<div className={styles.actions}>
						{i === 0 && !isTickerNewsPage() && (
							<a
								className={styles.allTickersButton}
								href='/sites/Merck/SitePages/TickerNews.aspx'
							>
								Alle Ticker
							</a>
						)}
						{t.Sichtbarkeit !== 'Immer' && (
							<div className={styles.close} onClick={() => dismissTicker(t)}>
								×
							</div>
						)}
					</div>
				</div>
			))}

			{props.showArchive && pastTickers.length > 0 && (
				<div className={styles.accordionContainer}>
					<Accordion
						title='Vergangene Ticker-News'
						defaultCollapsed={true}
						className={styles.accordion}
					>
						<div>
							{pastTickers.map((t) => (
								<div
									key={t.Id}
									className={styles.archiveItem}
									style={{
										backgroundColor: getColor(t.Kategorie),
										borderTop: `1px solid ${getBorderColor(t.Kategorie)}`,
										borderBottom: `1px solid ${getBorderColor(t.Kategorie)}`,
									}}
								>
									<img
										src={getIcon(t.Kategorie)}
										className={styles.icon}
										alt={t.Kategorie}
									/>
									<div className={styles.textBlock}>
										{t.Datum && (
											<div className={styles.date}>{formatDate(t.Datum)} /</div>
										)}
										<b className={styles.title}>{t.Title}</b>
										{t.Beschreibung && (
											<div className={styles.message}>{t.Beschreibung}</div>
										)}
										{t.Link && (
											<a
												className={styles.links}
												href={t.Link}
												target='_blank'
												rel='noopener noreferrer'
											>
												Mehr
											</a>
										)}
									</div>
								</div>
							))}
						</div>
					</Accordion>
				</div>
			)}
		</section>
	)
}
