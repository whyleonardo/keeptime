interface MemoriesTimelineProps {
	children: React.ReactNode
}

export const MemoriesTimeline = ({ children }: MemoriesTimelineProps) => {
	// const router = useRouter()

	// const [from, setFrom] = useState(1)

	// const containerRef = useRef<HTMLDivElement>(null)

	// function handleLoadMoreMemories() {
	// 	setFrom((prev) => prev + 5)
	// }

	// useEffect(() => {
	// 	router.replace(`/memories?from=${from}`)
	// }, [from])

	return (
		<div
			// ref={containerRef}
			className="relative mt-6 flex w-full flex-wrap justify-center gap-8 rounded-md py-6 md:mb-0 md:border md:px-6"
		>
			{children}
			{/* <Button onClick={handleLoadMoreMemories}>Load More</Button> */}
		</div>
	)
}
