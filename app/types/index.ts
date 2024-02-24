import type { Beats as BeatsState } from '../sound/beats';
import type { State as GlobalState } from '../store/globalStore';
import type { State as StaticState } from '../store/staticStore';

export type ReduxState = {
  static: StaticState,
  global: GlobalState,
  beats: BeatsState,
};

export type BaseReduxAction = {
  type: string,
};

export type PayloadReduxAction = {
  type: string,
  payload: any,
};

export type ReduxAction = {
  type: string,
  payload?: any,
};

export type ReduxActionWithPayload = {
  type: string,
  payload: any,
};

export type ReduxMiddlewareArgument = {
  dispatch: Function,
  getState: () => ReduxState,
};

export type ErrorContent = {
  message?: string,
  statusCode?: string | number,
  name?: string,
};

export type ErrorAction = {
  type: string,
  error: true,
  payload: ErrorContent,
};

type CauseActionType = string;
type NextAction = (() => ReduxAction) | string;

export type ActionChains = {
  [key: CauseActionType]: Array<NextAction> | NextAction,
};

export type AsyncCallback = (...any) => void;
