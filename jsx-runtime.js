import ElementComponent from '../../@xylem-js/xylem-js/dom/_internal/ElementComponent.js';
import isSupplier from '../../@xylem-js/xylem-js/utilities/isSupplier.js';
import TextComponent from '../../@xylem-js/xylem-js/dom/_internal/TextComponent.js';
const listenerRegexOn = /^on:(.+)$/;
const listenerRegexAt = /^@(.+)$/;
export function jsxs(tagName, attributesWithChildren, key) {
    let { children, ...attributes } = attributesWithChildren;
    if (arguments.length > 2) {
        attributes.key = key;
    }
    let childrenArray;
    if (Array.isArray(children)) {
        childrenArray = children.flat();
    }
    else if (children === undefined) {
        childrenArray = [];
    }
    else if (typeof children === 'string') {
        childrenArray = [new TextComponent(children)];
    }
    else {
        childrenArray = [children];
    }
    childrenArray = (childrenArray).map(child => {
        if (typeof child === 'object' && child !== null) {
            if (Array.isArray(child)) {
                throw new Error(`child is array`);
            }
            else if (isSupplier(child)) {
                return new TextComponent(child);
            }
            else {
                return child;
            }
        }
        return new TextComponent(child);
    });
    if (typeof tagName === 'string') {
        const elementComponent = new ElementComponent(tagName, attributes, childrenArray);
        for (const key in attributes) {
            if (key === '<>') {
                elementComponent.elementSubscriber(attributes['<>']);
                attributes['<>'] = false;
            }
            else if (listenerRegexOn.test(key)) {
                const [, eventName] = listenerRegexOn.exec(key);
                elementComponent.addListener(eventName, attributes[key]);
                attributes[key] = false;
            }
            else if (listenerRegexAt.test(key)) {
                const [, eventName] = listenerRegexAt.exec(key);
                elementComponent.addListener(eventName, attributes[key]);
                attributes[key] = false;
            }
        }
        return elementComponent;
    }
    else if (tagName === Fragment) {
        return childrenArray;
    }
    else {
        return new tagName(attributesWithChildren);
    }
}
export function jsx(_tagName, _attributesWithChildren, _key) {
    return jsxs.apply(null, arguments);
}
export function Fragment() {
}
