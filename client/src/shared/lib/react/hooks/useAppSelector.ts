import { useSelector, TypedUseSelectorHook } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
