import { EditorState } from './../interface/editor';
import { useMemo, useReducer } from 'react';
import { Methods } from '../editor/query';
import { ActionFunction, actions as editorActions } from '../editor/action';

interface ActionType {
  type: string;
  payload: any;
}

export const useMethods = (initialState: EditorState) => {
  const reducer = (state: EditorState, action: ActionType): EditorState => {
    switch (action.type) {
      default:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        editorActions(state)[action.type](...action.payload);
    }
    return { ...state };
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const query = useMemo(() => {
    return Methods(state);
  }, [state]);

  const formatActions = useMemo(() => {
    return {
      ...Object.keys(editorActions(state)).reduce((accum, type) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        accum[type] = (...payload: any) => dispatch({ type, payload });
        return accum;
      }, {} as ActionFunction),
    };
  }, [state]);

  return useMemo(
    () => ({
      actions: formatActions,
      query,
      state,
    }),
    [formatActions, query, state],
  );
};
