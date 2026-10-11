import { jsxDEV as reactJsxDEV } from 'react/jsx-dev-runtime';
import { localizedTag } from './jsx-runtime';
import type { ElementType, JSX as ReactJSX } from 'react';
export { Fragment } from 'react/jsx-runtime';
export namespace JSX {
  export type Element = ReactJSX.Element;
  export type ElementType = ReactJSX.ElementType;
  export type ElementClass = ReactJSX.ElementClass;
  export type ElementAttributesProperty = ReactJSX.ElementAttributesProperty;
  export type ElementChildrenAttribute = ReactJSX.ElementChildrenAttribute;
  export type LibraryManagedAttributes<C, P> = ReactJSX.LibraryManagedAttributes<C, P>;
  export type IntrinsicAttributes = ReactJSX.IntrinsicAttributes;
  export type IntrinsicClassAttributes<T> = ReactJSX.IntrinsicClassAttributes<T>;
  export type IntrinsicElements = ReactJSX.IntrinsicElements;
}
export function jsxDEV(type: ElementType, props: Record<string, unknown>, key: string | undefined, isStaticChildren: boolean, source: Parameters<typeof reactJsxDEV>[4], self: unknown) {
  return reactJsxDEV(typeof type === 'string' ? localizedTag(type) : type, props, key, isStaticChildren, source, self);
}
