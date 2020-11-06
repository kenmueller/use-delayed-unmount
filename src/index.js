const sleep = timeout =>
	new Promise(resolve => setTimeout(resolve, timeout))

const useDelayedUnmount = (isInitiallyMounted, delay) => {
	const [isMounted, _setIsMounted] = useState(isInitiallyMounted)
	const [isUnmounting, setIsUnmounting] = useState(false)
	
	const setIsMounted = useCallback(async _isMounted => {
		if (isMounted === _isMounted)
			return
		
		if (!_isMounted) {
			setIsUnmounting(true)
			await sleep(delay)
			setIsUnmounting(false)
		}
		
		_setIsMounted(_isMounted)
	}, [isMounted, delay, _setIsMounted, setIsUnmounting])
	
	return [[isMounted, isUnmounting], setIsMounted]
}

module.exports = useDelayedUnmount
