import {rootReducer} from './Reducers';
import {store} from './store';

export type RootState = ReturnType<typeof rootReducer>;
export type RootAction = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;
