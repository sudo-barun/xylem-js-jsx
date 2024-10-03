import Component from '../../@xylem-js/xylem-js/dom/Component.js';
import ElementComponent from '../../@xylem-js/xylem-js/dom/_internal/ElementComponent.js';
import isSupplier from '../../@xylem-js/xylem-js/utilities/isSupplier.js';
import TextComponent from '../../@xylem-js/xylem-js/dom/_internal/TextComponent.js';

export type * from './jsx.d.js';

const listenerRegexOn = /^on:(.+)$/;
const listenerRegexAt = /^@(.+)$/;

export
function jsxs(
	tagName: string|(new(...args: any) => Component),
	attributesWithChildren: {[propertyName: string]: any, children?: undefined|string|object|Array<any>},
	key?: number
) {
	let { children, ...attributes } = attributesWithChildren;
	if (arguments.length > 2) {
		attributes.key = key;
	}

	let childrenArray: any[];

	if (Array.isArray(children)) {
		childrenArray = children.flat();
	} else if (children === undefined) {
		childrenArray = [];
	} else if (typeof children === 'string') {
		childrenArray = [new TextComponent(children)];
	} else {
		childrenArray = [children];
	}

	childrenArray = (childrenArray).map(child => {
		if (typeof child === 'object' && child !== null) {
			if (Array.isArray(child)) {
				throw new Error(`child is array`);
			} else if (isSupplier<string>(child)) {
				return new TextComponent(child);
			} else {
				return child;
			}
		}
		return new TextComponent(child);
	});

	if (typeof tagName === 'string') {
		const elementComponent = new ElementComponent(
			tagName,
			attributes,
			childrenArray
		);
		for (const key in attributes) {

			if (key === '<>') {
				elementComponent.elementSubscriber(attributes['<>']);
				attributes['<>'] = false;
			} else if (listenerRegexOn.test(key)) {
				const [, eventName] = listenerRegexOn.exec(key)!;
				elementComponent.addListener(eventName, attributes[key]);
				attributes[key] = false;
			} else if (listenerRegexAt.test(key)) {
				const [, eventName] = listenerRegexAt.exec(key)!;
				elementComponent.addListener(eventName, attributes[key]);
				attributes[key] = false;
			}
		}
		return elementComponent;
	} else if (tagName as any === Fragment) {
		return childrenArray;
	} else {
		return new tagName(attributesWithChildren);
	}
}

export
function jsx(
	_tagName: string|(new(...args: any)=>any),
	_attributesWithChildren: {[attributeName: string]: any, children?: undefined|string|object|Array<any>},
	_key?: number
) {
	return jsxs.apply(null, arguments as any);
}

export
function Fragment()
{
}
