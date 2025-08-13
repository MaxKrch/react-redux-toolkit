import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux'
import type { APP_DISPATCH_TYPE, APP_STATE_TYPE } from './store'

export const useAppDispatch = () => useDispatch<APP_DISPATCH_TYPE>()
export const useAppSelector: TypedUseSelectorHook<APP_STATE_TYPE> = useSelector
