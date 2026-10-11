import { createElement as reactCreateElement, type ElementType } from 'react';
import { localizedTag } from './jsx-runtime';
// Babel uses createElement when a spread precedes a JSX key.
export const createElement: typeof reactCreateElement = ((type: ElementType, props: unknown, ...children: unknown[]) => reactCreateElement(typeof type === 'string' ? localizedTag(type) : type, props as never, ...children as never[])) as typeof reactCreateElement;
