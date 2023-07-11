export const dateFormat = (date: Date, omitDay = false) => {
	const formatedDate = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: omitDay ? undefined : 'numeric',
		year: 'numeric'
	}).format(date)

	return formatedDate
}
