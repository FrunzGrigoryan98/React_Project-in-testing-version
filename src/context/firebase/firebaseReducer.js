import { ADD_NODE, FETCH_NODES, REMOVE_NODE, SHOW_LOADEER } from "../types"

const hendlers = {
    [SHOW_LOADEER]: state => ({ ...state, loading: true }),
    [ADD_NODE]: (state, { payload }) => ({
        ...state,
        notes: [...state.notes, payload]
    }),
    [FETCH_NODES]: (state, { payload }) => ({ ...state, notes: payload, loading: false }),
    [REMOVE_NODE]: (state, { payload }) => ({
        ...state,
        notes: state.notes.filter(note => note.id !== payload)
    }),

    DEFAULT: state => state
}
export const firebaseReducer = (state, action) => {
    const handle = hendlers[action.type] || hendlers.DEFAULT
    return handle(state, action)
}