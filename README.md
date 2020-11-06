# useDelayedUnmount

> Delay the unmount of a component to apply an unmount animation.

## What does it do?

By delaying the unmounting of a component, you can apply an animation before the component unmounts. This is useful for modals, dropdowns, and a bunch of other scenarios since CSS does not natively support unmount animations.

## Example

```js
import useDelayedUnmount from 'use-delayed-unmount'

const Home = () => {
	const [[isMounted, isUnmounting], setIsMounted] = useDelayedUnmount(false, 300)
	
	return (
		<>
			<button onClick={() => setIsMounted(!isMounted)}>
				Toggle
			</button>
			{isMounted && (
				<p className={isUnmounting ? 'hide' : ''}>
					Hello!
				</p>
			)}
		</>
	)
}
```

```css
p {
	animation: show 0.3s linear;
}

.hide {
	animation: hide 0.3s linear;
}

@keyframes show {
	from { opacity: 0; }
}

@keyframes hide {
	to { opacity: 0; }
}
```

## How it works

When `setIsMounted` is called with `true`, the component is immmediately mounted. When `setIsMounted` is called with `false`, `isUnmounting` is set to `true` and `isMounted` is set to false only after the specified delay.
