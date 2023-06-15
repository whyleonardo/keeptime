'use client'

import { useState } from 'react'

import { CreateMemoryForm } from '@/components/Forms/CreateMemoryForm'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
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
			<div className="md:flex md:w-full">
				<Sheet open={open}>
					<SheetTrigger asChild>
						<Button
							variant="default"
							onClick={() => setOpen(true)}
							className="fixed bottom-4 right-[3.225rem] flex max-w-fit items-center gap-2"
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
							<CreateMemoryForm setOpen={setOpen} />
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>

			{/* MOBILE */}
			<div className="md:invisible md:hidden">
				<Sheet open={openMobile}>
					<SheetTrigger asChild>
						<Button
							variant="default"
							onClick={() => setOpenMobile(true)}
							className="fixed bottom-4 right-[3.225rem] flex max-w-fit items-center gap-2"
						>
							<Icons.plus />
							<span className="hidden lg:inline-block">Create Memory</span>
						</Button>
					</SheetTrigger>

					<SheetContent
						className="pt-10 sm:hidden"
						setOpen={setOpenMobile}
						size="full"
						position="bottom"
					>
						<SheetHeader>
							<SheetTitle>Create Your Memory</SheetTitle>
							<CreateMemoryForm setOpen={setOpenMobile} />
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
		</>
	)
}
