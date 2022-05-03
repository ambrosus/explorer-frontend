import { useEffect, useState } from 'react'

const useWindowSize = () => {
	const [width, setWidth] = useState(window.innerWidth)
	const [height, setHeight] = useState(window.innerHeight)

	useEffect(() => {
		const updateWindowDimensions = () => {
			setWidth(window.innerWidth)
			setHeight(window.innerHeight)
		}
		window.addEventListener('resize', updateWindowDimensions)
		console.log(width)

		return () => window.removeEventListener('resize', updateWindowDimensions)
	}, [width])
	return { width, height }
}

export default useWindowSize
