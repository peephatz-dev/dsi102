/** Localize presentation at React's JSX boundary, leaving course data and simulation rules intact. */
import { forwardRef, type ElementType, type ReactNode } from 'react';
import { jsx as reactJsx, jsxs as reactJsxs, Fragment } from 'react/jsx-runtime';
import { useLanguage } from './LocaleContext';
import { translate } from './translate';
import type { JSX as ReactJSX } from 'react';
export { Fragment };
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
const tags = new Map<string, ElementType>();
const attributes = ['title', 'placeholder', 'aria-label', 'aria-description', 'aria-valuetext', 'alt', 'label'];
function localizeChildren(value: ReactNode, language: 'th' | 'en'): ReactNode {
  if (typeof value === 'string') return translate(value, language);
  if (Array.isArray(value)) return value.map(child => localizeChildren(child, language));
  return value;
}
export function localizedTag(tag: string): ElementType {
  const existing = tags.get(tag); if (existing) return existing;
  const Tag = forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
    const { language } = useLanguage();
    // User input and source filenames stay exactly as entered; never translate values or identifiers.
    const translated: Record<string, unknown> = { ...props, ref };
    if (props['data-no-translate'] !== true) {
      for (const attribute of attributes) if (typeof props[attribute] === 'string') translated[attribute] = translate(props[attribute] as string, language);
      translated.children = localizeChildren(props.children as ReactNode, language);
    }
    return reactJsx(tag as ElementType, translated);
  });
  Tag.displayName = `Localized(${tag})`; tags.set(tag, Tag); return Tag;
}
export function jsx(type: ElementType, props: Record<string, unknown>, key?: string) { return reactJsx(typeof type === 'string' ? localizedTag(type) : type, props, key); }
export function jsxs(type: ElementType, props: Record<string, unknown>, key?: string) { return reactJsxs(typeof type === 'string' ? localizedTag(type) : type, props, key); }
