const { useState, useCallback, useRef } = require("react");

const useDelayedUnmount = (isInitiallyMounted, delay = 300) => {
	const [state, setState] = useState({
		isMounted: isInitiallyMounted,
		isUnmounting: false,
	});
	const timeoutRef = useRef(null);

	const setIsMounted = useCallback(
		(_isMounted) => {
			// Since we delay setting the mount state we compute the logical "open" state:
			const isOpen = state.isUnmounting ? false : state.isMounted;

			// Support useState callback pattern
			if (typeof _isMounted === "function") {
				_isMounted = _isMounted(isOpen);
			}

			if (isOpen === _isMounted) {
				return;
			}

			if (_isMounted) {
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
					timeoutRef.current = null;
				}
				setState({
					isMounted: true,
					isUnmounting: false,
				});
			} else {
				setState({
					isMounted: true,
					isUnmounting: true,
				});
				timeoutRef.current = setTimeout(() => {
					setState({
						isMounted: false,
						isUnmounting: false,
					});
					timeoutRef.current = null;
				}, delay);
			}
		},
		[state, setState, delay]
	);
	return [[state.isMounted, state.isUnmounting], setIsMounted];
};

module.exports = useDelayedUnmount;
