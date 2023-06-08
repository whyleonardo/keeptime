export const dateFormat = (date: Date) => {
	const formatedDate = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	}).format(date)

	return formatedDate
}
