'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Icons } from '@/components/Icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AvatarPickerProps {
	avatarUrl: string | null | undefined
	field: any
}

type Media = {
	url: string
	type: string
	size: number
}

export const AvatarPicker = ({ avatarUrl, field }: AvatarPickerProps) => {
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
	const [avatar, setAvatar] = useState<string | null | undefined>(avatarUrl)

	function handleChangeAvatar(e: React.ChangeEvent<HTMLInputElement>) {
		const { files } = e.target
		const file = files?.[0]
		if (!file) return

		const newFile: Media = {
			url: URL.createObjectURL(file),
			type: file?.type,
			size: file?.size
		}

		setAvatarPreview(newFile.url)
		setAvatar(newFile.url)
		field.onChange(file)
	}

	function removeAvatar() {
		setAvatarPreview(null)
		field.onChange(null)
		setAvatar(null)
	}

	return (
		<div className="flex flex-col items-center gap-2">
			<Label
				className="group relative cursor-pointer rounded-full border"
				htmlFor="avatarUrl"
			>
				{avatarPreview ? (
					<Image
						alt=""
						width={360}
						height={360}
						src={avatarPreview}
						className="aspect-square h-32 w-32 rounded-full border-2 border-muted"
					/>
				) : field.value ? (
					<Image
						alt=""
						width={360}
						height={360}
						src={field.value}
						className="aspect-square h-32 w-32 rounded-full border-2 border-muted"
					/>
				) : avatar ? (
					<Image
						alt=""
						width={360}
						height={360}
						src={avatar}
						className="aspect-square h-32 w-32 rounded-full border-2 border-muted"
					/>
				) : (
					<div className="h-32 w-32 rounded-full border-2 bg-muted" />
				)}

				<span className="absolute -bottom-2 right-4 rounded-full border-2 bg-background p-2 transition-transform group-hover:scale-105">
					<Icons.camera className=" h-4 w-4" />
				</span>
			</Label>

			{(avatarPreview || avatar) && (
				<button
					type="button"
					onClick={removeAvatar}
					className="flex items-center text-blue-600 transition-colors hover:opacity-80 dark:text-blue-400"
				>
					<Icons.x className="h-5 w-5" />
					Remove avatar
				</button>
			)}
			<Input
				className="sr-only"
				type="file"
				accept="image/*"
				id="avatarUrl"
				name={field.name}
				onBlur={field.onBlur}
				ref={field.ref}
				onChange={(e) => handleChangeAvatar(e)}
			/>
		</div>
	)
}
