'use client'

import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { FileText } from 'lucide-react'

type MediaProps = {
	url: string
	type: string
	size: number
}

export const MediaPicker = ({ field }: any) => {
	const [mediaPreview, setMediaPreview] = useState<MediaProps | null>(null)

	async function handleUploadMedia(e: ChangeEvent<HTMLInputElement>) {
		const { files } = e.target
		const file = files?.[0]
		if (!file) return

		const newFile: MediaProps = {
			url: URL.createObjectURL(file),
			type: file?.type,
			size: file?.size
		}

		setMediaPreview(newFile)
		field.onChange(file)
	}

	return (
		<>
			<Label
				htmlFor="media_upload"
				className="flex cursor-pointer items-center gap-1 transition duration-300 "
			>
				{mediaPreview ? (
					mediaPreview.type.includes('image') ? (
						<Image
							alt=""
							width={40}
							height={40}
							src={mediaPreview.url}
							className="aspect-square w-full rounded"
						/>
					) : (
						<video
							controls={true}
							src={mediaPreview.url}
							className="flex items-center gap-1"
						/>
					)
				) : (
					<div className="text-muted-foreground flex h-36 w-full items-center justify-center gap-1 rounded border-2 border-dashed transition-all duration-300 hover:brightness-150">
						<p className="text-center">Upload a file</p>
						<FileText className="h-4 w-4" />
					</div>
				)}
			</Label>

			<Input
				id="media_upload"
				accept="image/*, video/*"
				type="file"
				className="hidden"
				name={field.name}
				onBlur={field.onBlur}
				ref={field.ref}
				onChange={(e) => handleUploadMedia(e)}
			/>
		</>
	)
}
