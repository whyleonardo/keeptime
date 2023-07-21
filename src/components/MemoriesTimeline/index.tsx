'use client'

import { useEffect, useRef, useState } from 'react'
import 'intersection-observer'
// @ts-expect-error - no lib types
import { useIsVisible } from 'react-is-visible'

import { Icons } from '@/components/Icons'
import { Card } from '@/components/ui/card'

import { Memory } from '@/types/memory'
import { getMemories } from '@/utils/getMemories'

export const MemoriesTimeline = () => {
	const TO_RANGE = 2
	const [fromRange, setFromRange] = useState(3)
	const [isLast, setIsLast] = useState(false)

	const [memories, setMemories] = useState<Memory[] | null>([])
	const containerRef = useRef<HTMLDivElement>(null)
	const visible = useIsVisible(containerRef)

	useEffect(() => {
		if (visible && !isLast) {
			setFromRange((prevState) => prevState + 1)
			getMemories(TO_RANGE, fromRange).then((res) => {
				if (res?.length == memories?.length) {
					setIsLast(true)
				}

				setMemories(res)
			})
		}
	}, [visible])

	return (
		<div className="flex w-full flex-col gap-2">
			{memories &&
				memories.map((memory) => (
					<Card
						key={memory.id}
						className="flex h-[1150px] w-full flex-col items-center overflow-hidden last:pb-20"
					>
						{memory.title}
					</Card>
				))}

			<div
				ref={containerRef}
				className="flex w-full flex-col items-center justify-center"
			>
				{!isLast ? (
					<Icons.spinner className="text-muted h-10 w-10 animate-spin" />
				) : (
					<p>Acabou</p>
				)}
			</div>
		</div>
	)
}
