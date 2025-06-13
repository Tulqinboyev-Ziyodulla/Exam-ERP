import { useEffect, useState } from 'react'

export function useIsMobile(breakpoint: number = 768): boolean {
	const [isMobile, setIsMobile] = useState<boolean>(false)

	useEffect(() => {
		function checkMobile() {
			setIsMobile(window.innerWidth <= breakpoint)
		}

		checkMobile()

		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [breakpoint])

	return isMobile
}
