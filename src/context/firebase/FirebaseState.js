import axios from "axios";
import React, { useReducer } from "react";
import { ADD_NODE, FETCH_NODES, REMOVE_NODE, SHOW_LOADEER } from "../types";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
const url = process.env.REACT_APP_DB_URL
export const FirebaseState = ({ children }) => {
    const initialState = {
        notes: [],
        loading: false
    }
    const [state, dispatch] = useReducer(firebaseReducer, initialState)
    const showLoader = () => dispatch({ type: SHOW_LOADEER })
    const fetchNotes = async () => {
        showLoader()
        const res = await axios.get(`${url}/notes.json`)
        if (res.data) {
            const payload = Object.keys(res.data).map(key => {
                return {
                    ...res.data[key],
                    id: key
                }
            })
            dispatch({
                type: FETCH_NODES,
                payload
            })
        }


    }
    const addNote = async title => {
        const note = {
            title,
            date: new Date().toJSON()
        }
        try {
            const res = await axios.post(`${url}/notes.json`, note)
            const payload = {
                ...note,
                id: res.data.name
            }
            dispatch({
                type: ADD_NODE,
                payload
            })
        } catch (e) {
            throw new Error(e.massage)
        }

    }
    const removeNote = async id => {
        await axios.delete(`${url}/notes/${id}.json`,)
        dispatch({
            type: REMOVE_NODE,
            payload: id
        })
    }
    return (
        <FirebaseContext.Provider value={{
            showLoader, addNote, removeNote, fetchNotes,
            loading: state.loading,
            notes: state.notes
        }}>
            {children}
        </FirebaseContext.Provider>
    )

}