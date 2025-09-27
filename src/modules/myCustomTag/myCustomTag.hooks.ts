/* src\modules\myCustomTag\myCustomTag.hooks.ts */

// #section Imports
import { useReducer } from "react";
import type { TagBase, TagActionsType } from "./myCustomTag.d";
// #end-section

// #function tagReducer
const tagReducer = (state: TagBase[], action: TagActionsType): TagBase[] => {
  // #state newState - copy of state and modified return value
  const newState = [...state];
  // #end-state
  switch (action.type) {
    // #section case "ADD"
    case "ADD": {
      const data = action.payload.data;
      newState.push(data); 
      return newState;
    }
    // #end-section
    // #section case "REMOVE"
    case "REMOVE": {
      const index = action.payload.index;
      newState.splice(index, 1);
      return newState;
    }
    // #end-section
    // #section case "UPDATE"
    case "UPDATE": {
      const { index, data } = action.payload;
      newState[index] = { ...newState[index], ...data} // fields in data overwrite existing fields in the tag
      return newState;
    }
    // #end-section
    // #section default
    default:
      return state; // No changes to state for unrecognized action types
    // #end-section

  }
}
// #end-function

export const useTags = (initialTags: TagBase[] = [] ) => {
  // #state [tagList, dispatchTag]
  const [tagList, dispatchTag] = useReducer(tagReducer, initialTags);
  // #end-state
  // #function createTag
  const createTag = (data: TagBase) => {
    dispatchTag({ type: 'ADD', payload: { data }})
  }
  // #end-function
  // #function updateTag
  const updateTag = (data: TagBase, index: number) => {
    dispatchTag({ type: 'UPDATE', payload: { data, index }})
  }
  // #end-function
  // #function removeTag
  const removeTag = (index: number) => {
    dispatchTag({ type: 'REMOVE', payload: { index }})
  }
  // #end-function
  // #section return
  return {
    tagList,
    createTag,
    updateTag,
    removeTag
  }
  // #end-section
}