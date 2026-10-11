import { Children, cloneElement, isValidElement, type ReactNode } from 'react';
import { translate } from './translate';
import type { Language } from './LocaleContext';
/** Translate labels rendered by third-party primitives without changing values or event handlers. */
export function localizeContent(node: ReactNode, language: Language): ReactNode {
  if (typeof node === 'string') return translate(node, language);
  if (Array.isArray(node)) return Children.map(node, item => localizeContent(item, language));
  if (isValidElement<{ children?: ReactNode; 'data-no-translate'?: boolean }>(node) && node.props.children && !node.props['data-no-translate']) return cloneElement(node, {}, localizeContent(node.props.children, language));
  return node;
}
