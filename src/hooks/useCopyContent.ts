import { useEffect, useState } from 'react'

const useCopyContent = (address: any) => {
	const [isCopy, setIsCopy] = useState(false)

	const copyContent = () => {
		address && navigator.clipboard.writeText(address)

		setIsCopy(true)
	}
	useEffect(() => {
		const timer = setTimeout(() => setIsCopy(false), 1000)
		return () => clearTimeout(timer)
	}, [isCopy])

	return { isCopy, copyContent }
}

export default useCopyContent
