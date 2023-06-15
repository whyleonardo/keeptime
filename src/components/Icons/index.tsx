import { ChevronDown } from 'lucide-react'
import {
	LucideProps,
	Moon,
	SunMedium,
	Twitter,
	ChevronLeft,
	MoreVertical,
	Loader2,
	LogOut,
	Mail,
	Album,
	CalendarDays,
	UserCircle2,
	AtSign,
	Heart,
	Plus,
	Settings,
	type Icon as LucideIcon
} from 'lucide-react'

export type Icon = LucideIcon

export const Icons = {
	album: Album,
	settings: Settings,
	chevronLeft: ChevronLeft,
	chevronDown: ChevronDown,
	date: CalendarDays,
	website: AtSign,
	heart: Heart,
	user: UserCircle2,
	mail: Mail,
	plus: Plus,
	logout: LogOut,
	spinner: Loader2,
	more: MoreVertical,
	sun: SunMedium,
	moon: Moon,
	twitter: Twitter,
	logo: (props: LucideProps) => (
		<svg
			width="73"
			height="67"
			viewBox="0 0 73 67"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M70.8195 54.3772C70.2422 53.4583 69.4875 52.6636 68.5995 52.0397C67.7116 51.4158 66.7081 50.9752 65.6479 50.7435C61.5915 49.8001 58.0735 47.2894 55.8625 43.7601C53.6516 40.2307 52.9276 35.9697 53.8486 31.9082C54.2027 30.3384 54.0851 28.699 53.5105 27.1958C52.9359 25.6926 51.93 24.3927 50.6191 23.4594C49.3081 22.5261 47.7506 22.001 46.1421 21.9499C44.5337 21.8989 42.9461 22.3242 41.5786 23.1725C40.2111 24.0209 39.1248 25.2543 38.456 26.718C37.7873 28.1818 37.5659 29.8104 37.8198 31.3995C38.0736 32.9886 38.7914 34.4673 39.8829 35.6498C40.9743 36.8323 42.3909 37.666 43.9546 38.046C45.9776 38.5023 47.8906 39.3534 49.584 40.5505C51.2774 41.7475 52.7179 43.2671 53.8229 45.0219C54.9279 46.7768 55.6757 48.7325 56.0234 50.7769C56.3712 52.8213 56.312 54.9143 55.8493 56.9358C55.5753 58.239 55.6241 59.5894 55.9916 60.8693C56.3591 62.1492 57.0341 63.3198 57.9577 64.2792C58.8813 65.2385 60.0254 65.9574 61.2905 66.3732C62.5556 66.789 63.9031 66.889 65.2157 66.6647C66.5284 66.4404 67.7662 65.8984 68.8214 65.0861C69.8766 64.2737 70.717 63.2157 71.2696 62.0041C71.8221 60.7924 72.07 59.4641 71.9916 58.1348C71.9131 56.8054 71.5108 55.5154 70.8195 54.3772Z" />
			<path d="M20.6144 45.3133C22.0429 46.0928 23.6716 46.4278 25.2917 46.2752C26.9119 46.1226 28.4494 45.4894 29.7072 44.4569C30.965 43.4243 31.8856 42.0395 32.3508 40.4802C32.8161 38.9208 32.8048 37.258 32.3184 35.7051C31.7019 33.7249 31.4823 31.6426 31.6722 29.5774C31.8621 27.5122 32.4576 25.5048 33.4249 23.6703C34.3921 21.8358 35.7119 20.2102 37.3086 18.8867C38.9053 17.5632 40.7475 16.568 42.7296 15.9579C44.2669 15.4764 45.6273 14.5509 46.6398 13.298C47.6523 12.0451 48.2716 10.5207 48.4197 8.9166C48.5679 7.3125 48.2383 5.7004 47.4724 4.2833C46.7065 2.8661 45.5385 1.7071 44.1155 0.952201C42.6924 0.197301 41.0779 -0.119899 39.4751 0.0407015C37.8722 0.201201 36.3526 0.832201 35.1075 1.8544C33.8624 2.8765 32.9475 4.2441 32.4778 5.785C32.0082 7.3259 32.0048 8.9713 32.4681 10.5141C33.6843 14.4971 33.273 18.7998 31.3244 22.4803C29.3757 26.1608 26.0484 28.9194 22.0706 30.1524C20.5003 30.6078 19.1028 31.524 18.0591 32.7826C17.0154 34.0412 16.3735 35.5841 16.2166 37.2115C16.0598 38.839 16.3951 40.4761 17.1792 41.9108C17.9633 43.3456 19.16 44.5119 20.6144 45.2588V45.3133Z" />
			<path d="M41.6273 43.9794C40.5416 44.0175 39.4745 44.2719 38.4883 44.7276C37.5021 45.1833 36.6168 45.8311 35.8841 46.6333C33.0416 49.6736 29.1109 51.4648 24.9515 51.6153C20.792 51.7658 16.7421 50.2632 13.6873 47.4362C12.898 46.6956 11.9694 46.1193 10.9554 45.7408C9.9415 45.3623 8.8624 45.1892 7.7809 45.2315C6.4497 45.2943 5.154 45.682 4.0071 46.3607C2.8601 47.0394 1.8968 47.9885 1.2011 49.1251C0.505298 50.2618 0.0983981 51.5515 0.0156981 52.8816C-0.0669019 54.2118 0.177199 55.5419 0.726899 56.756C1.2766 57.97 2.115 59.0311 3.1691 59.8466C4.2232 60.6621 5.4608 61.2071 6.774 61.4342C8.0872 61.6613 9.4361 61.5636 10.7028 61.1495C11.9696 60.7354 13.1157 60.0176 14.0411 59.0586C15.4489 57.5344 17.1435 56.3029 19.0279 55.4347C20.9124 54.5665 22.9496 54.0785 25.0229 53.9989C27.0962 53.9193 29.1649 54.2494 31.1104 54.9705C33.0559 55.6917 34.84 56.7895 36.3605 58.2012C37.3504 59.0957 38.5444 59.7339 39.838 60.0601C41.1317 60.3864 42.4855 60.3907 43.7812 60.0727C45.0769 59.7547 46.2748 59.1241 47.2704 58.236C48.266 57.3479 49.0288 56.2293 49.4922 54.9782C49.9555 53.7271 50.1052 52.3816 49.9283 51.0592C49.7513 49.7369 49.253 48.4781 48.4769 47.3928C47.7009 46.3076 46.6709 45.4291 45.4768 44.834C44.2827 44.239 42.961 43.9455 41.6273 43.9794Z" />
		</svg>
	),
	gitHub: (props: LucideProps) => (
		<svg viewBox="0 0 438.549 438.549" {...props}>
			<path
				fill="currentColor"
				d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
			></path>
		</svg>
	),
	tailwind: (props: LucideProps) => (
		<svg
			role="img"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fill="currentColor"
				d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
			/>
		</svg>
	)
}
