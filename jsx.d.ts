import Subscriber from '../xylem-js/types/Subscriber.js';
import Supplier from '../xylem-js/types/Supplier.js';

type PrimitiveAttribute = boolean|string|number|null|undefined;

type Attribute = (
	PrimitiveAttribute
	| Supplier<PrimitiveAttribute>
);

export namespace JSX {
	interface IntrinsicElements {
		[tagName: string]: (
			{
				class?:
					Attribute
					| { [className: string]: Supplier<boolean> }
					| Array<
						string
						| Supplier<string>
						| { [className: string]: Supplier<boolean> }
					>,
				style?:
					Attribute
					| { [propertyName: string] : Supplier<false|string> }
					| Array<
						string
						| Supplier<string>
						| { [propertyName: string]: Supplier<false|string> }
					>,
				[event: `on:${string}`]: EventListenerOrEventListenerObject,
				'<>'?: Subscriber<HTMLElement>,
			}
			&
			{
				// this has to be superset of previous types
				[other: string]:
					Attribute
					| { [className: string]: Supplier<boolean> }
					| { [propertyName: string]: Supplier<false|string> }
					| Array<
						string
						| Supplier<string>
						| { [className: string]: Supplier<boolean> }
						| { [propertyName: string]: Supplier<false|string> }
					>
					| EventListenerOrEventListenerObject
					| Subscriber<HTMLElement>
			}
		),
	}
}
