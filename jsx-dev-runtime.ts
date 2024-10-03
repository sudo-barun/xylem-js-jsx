import { jsxs } from './jsx-runtime.js';

export type * from './jsx.d.js';

export
function jsxDEV(
	_tagName: string|(new(...args: any)=>any),
	_attributesWithChildren: {[propertyName: string]: any, children?: undefined|string|object|Array<any>},
	_key?: number
) {
	return jsxs.apply(null, arguments as any);
}

export { Fragment } from './jsx-runtime.js';
