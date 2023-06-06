import Link from 'next/link'

export default function IndexPage() {
	return (
		<div>
			<p> Hello World </p>
			<Link href="/login">Login</Link>
		</div>
	)
}
