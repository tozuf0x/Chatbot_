import { MutableRefObject } from 'react';

export const focusOnInput = (inputRef: MutableRefObject<undefined>) => (inputRef.current as unknown as HTMLInputElement)?.focus();
