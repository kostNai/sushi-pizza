'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationControlsProps {
	hasNextPage: boolean
	hasPrevPage: boolean
}

const PaginationControls: FC<PaginationControlsProps> = ({
	hasNextPage,
	hasPrevPage
}) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const page = searchParams.get('page') ?? '1'
	const perPage = searchParams.get('perPage') ?? '4'

	return (
		<div className="flex gap-2">
			<button
				className="bg-blue-500 text-white p-1"
				disabled={!hasPrevPage}
				onClick={() => {
					router.push(`/?page=${Number(page) - 1}&perPage=${perPage}`)
				}}
			>
				prev page
			</button>

			<div>
				{page} / {Math.ceil(10 / Number(perPage))}
			</div>

			<button
				className="bg-blue-500 text-white p-1"
				disabled={!hasNextPage}
				onClick={() => {
					router.push(`/?page=${Number(page) + 1}&perPage=${perPage}`)
				}}
			>
				next page
			</button>
		</div>
	)
}

export default PaginationControls
