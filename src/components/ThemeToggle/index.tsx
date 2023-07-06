'use client'

import { useTheme } from 'next-themes'
import * as React from 'react'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'

interface ThemeToggleProps {
	isMobile?: boolean
}

export const ThemeToggle = ({ isMobile }: ThemeToggleProps) => {
	const { setTheme, theme } = useTheme()

	return (
		<>
			{isMobile ? (
				theme === 'light' ? (
					<>
						<Icons.sun className="h-4 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<button
							className="flex w-full items-center"
							onClick={() => setTheme('dark')}
						>
							Change Theme
						</button>
					</>
				) : (
					<>
						<Icons.moon className="h-4 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						<button
							className="flex w-full items-center"
							onClick={() => setTheme('light')}
						>
							Change Theme
						</button>
					</>
				)
			) : (
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
					className="hidden md:inline-flex"
				>
					<Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			)}
		</>
	)
}
