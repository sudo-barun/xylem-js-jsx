import ComponentChildren from '../xylem-js/types/ComponentChildren.js';
import Subscriber from '../xylem-js/types/Subscriber.js';
import Supplier from '../xylem-js/types/Supplier.js';

type PrimitiveAttribute = boolean|string|number|bigint|null|undefined;

type Attribute = (
	PrimitiveAttribute
	| Supplier<PrimitiveAttribute>
);

type ComponentChild = ComponentChildren extends (infer U)[] ? U : never;

type EventHandlers = {
	[K in keyof GlobalEventHandlersEventMap as `on:${K}`]: (
		((ev: GlobalEventHandlersEventMap[K]) => void)
		|
		{ handleEvent: (ev: GlobalEventHandlersEventMap[K]) => void }
	)
};

export namespace JSX {
	interface IntrinsicElements {
		[tagName: string]: (
			Partial<EventHandlers>
			&
			{
				class?:
					| Attribute
					| { [className: string]: unknown|Supplier<unknown> }
					| Array<
						string
						| Supplier<string>
						| { [className: string]: unknown|Supplier<unknown> }
					>,
				style?:
					| Attribute
					| { [propertyName: string]: Supplier<false|string> }
					| Array<
						string
						| Supplier<string>
						| { [propertyName: string]: Supplier<false|string> }
					>,
				'<>'?: Subscriber<HTMLElement>|Subscriber<SVGElement>|Subscriber<MathMLElement>,
				children?:
					| string|number|bigint|Supplier<string|number|bigint>
					| ComponentChild
					| Array<
						| string|number|bigint|Supplier<string|number|bigint>
						| ComponentChild | ComponentChildren
					>
				,
			}
			&
			{
				// this has to be superset of previous types
				[other: string]:
					| Attribute

					// class attribute
					| { [className: string]: unknown|Supplier<unknown> }
					| Array<
						string
						| Supplier<string>
						| { [className: string]: unknown|Supplier<unknown> }
					>

					// style attribute
					| { [propertyName: string]: Supplier<false|string> }
					| Array<
						string
						| Supplier<string>
						| { [propertyName: string]: Supplier<false|string> }
					>

					// event listener
					| EventHandlers[keyof EventHandlers]

					// element subscriber
					| Subscriber<HTMLElement>|Subscriber<SVGElement>|Subscriber<MathMLElement>

					// children
					| string|number|bigint|Supplier<string|number|bigint>
					| ComponentChild
					| Array<
						| string|number|bigint|Supplier<string|number|bigint>
						| ComponentChild | ComponentChildren
					>
			}
		),
	}
}
