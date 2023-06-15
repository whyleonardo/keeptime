'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MediaPicker } from '@/components/ui/media-picker'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

import { memorySchema } from '@/lib/validations/memory'
import { sbClient as supabase } from '@/services/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const CreateMemoryForm = ({
	setOpen
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const form = useForm<z.infer<typeof memorySchema>>({
		resolver: zodResolver(memorySchema),
		defaultValues: {
			title: '',
			description: '',
			is_public: false
		}
	})

	async function onSubmit(values: z.infer<typeof memorySchema>) {
		setLoading(true)
		const {
			data: { user }
		} = await supabase.auth.getUser()

		const mediaType = values.media.type.includes('image') ? 'image' : 'video'

		if (!user) return

		const { data } = await supabase.storage
			.from('medias')
			.upload(`${mediaType}/${crypto.randomUUID()}`, values.media)

		await supabase
			.from('memories')
			.insert({
				title: values.title,
				description: values.description,
				is_public: values.is_public,
				user_id: user?.id,
				media_path: data?.path
			})
			.throwOnError()

		form.reset()

		setOpen(false)
		setLoading(false)

		router.refresh()

		return toast({
			title: 'Memory created',
			description: 'Your memory was created successfully',
			variant: 'success'
		})
	}

	return (
		<Form {...form}>
			<ScrollArea className="h-screen w-full bg-transparent">
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="h-auto min-h-max w-full space-y-8 overflow-y-auto p-4 pb-20"
				>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="Memory title" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Give an description to your memory"
										{...field}
										className="resize-none"
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="is_public"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center gap-2">
									<FormLabel>Is Public?</FormLabel>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="media"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<MediaPicker field={field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">
						{loading ? <Icons.spinner className="animate-spin" /> : 'Create'}
					</Button>
				</form>
			</ScrollArea>
		</Form>
	)
}
