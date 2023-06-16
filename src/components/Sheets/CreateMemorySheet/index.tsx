'use client'

import { useState } from 'react'

import { CreateMemoryForm } from '@/components/Forms/CreateMemoryForm'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'

export const CreateMemorySheet = () => {
	const [open, setOpen] = useState(false)
	const [openMobile, setOpenMobile] = useState(false)

	return (
		<>
			<Sheet open={open}>
				<SheetTrigger asChild>
					<Button
						variant="default"
						onClick={() => setOpen(true)}
						className="fixed bottom-4 hidden max-w-fit items-center gap-2 md:right-[3.225rem] md:flex"
					>
						<Icons.plus />
						<span className="hidden lg:inline-block">Create Memory</span>
					</Button>
				</SheetTrigger>

				<SheetContent
					className="hidden md:block md:max-w-lg"
					setOpen={setOpen}
					position="right"
				>
					<SheetHeader>
						<SheetTitle>Create Your Memory</SheetTitle>
						<SheetDescription></SheetDescription>
					</SheetHeader>

					<ScrollArea className="h-screen w-full">
						<CreateMemoryForm setOpen={setOpen} />
					</ScrollArea>
				</SheetContent>
			</Sheet>

			{/* MOBILE */}
			<Sheet open={openMobile}>
				<SheetTrigger asChild>
					<Button
						variant="default"
						onClick={() => setOpenMobile(true)}
						className="fixed bottom-2 right-3 flex max-w-fit items-center gap-2 md:invisible md:right-[3.225rem] md:hidden"
					>
						<Icons.plus />
						<span className="hidden lg:inline-block">Create Memory</span>
					</Button>
				</SheetTrigger>

				<SheetContent
					className="flex h-[95%] w-full flex-col items-center justify-center border sm:hidden md:invisible md:hidden"
					setOpen={setOpenMobile}
					// size="xl"
					position="bottom"
				>
					<SheetHeader>
						<SheetTitle>Create Your Memory</SheetTitle>
					</SheetHeader>

					<ScrollArea className="h-screen w-full">
						<CreateMemoryForm setOpen={setOpenMobile} />
					</ScrollArea>
				</SheetContent>
			</Sheet>
		</>
	)
}
