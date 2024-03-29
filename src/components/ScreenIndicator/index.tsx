import { Icons } from '@/components/Icons'

export const ScreenIndicator = () => {
	if (process.env.NODE_ENV === 'production') return null

	return (
		<div className="fixed bottom-1 left-1 z-50 flex items-center justify-center gap-2 rounded-full bg-foreground p-3 font-mono text-xs font-bold text-background">
			<div className="block sm:hidden">xs</div>
			<div className="hidden sm:block md:hidden">sm</div>
			<div className="hidden md:block lg:hidden">md</div>
			<div className="hidden lg:block xl:hidden">lg</div>
			<div className="hidden xl:block 2xl:hidden">xl</div>
			<div className="hidden 2xl:block">2xl</div>

			<Icons.tailwind className="h-4 w-4" />
		</div>
	)
}
