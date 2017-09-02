import {List,Map} from "immutable";

/**
 * Return a state where entries have been added to the argument state
 * @param {Map} state 
 * @param {List} entries 
 * @returns {Map}
 */
export const setEntries = (state, entries) => state.set("entries", List(entries));

/**
 * Pick the next two entries form the list for voting
 * @param {Map} state 
 * @returns {Map}
 */
export const next = (state) => {
    const entries = state.get("entries");
    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    })
}

/**
 * Give a vote for an entry and create a tally if it doesn't exist already
 * @param {Map} state 
 * @param {string} entry 
 */
export const vote = (state, entry) => state.updateIn(["vote", "tally", entry], 0, tally => tally + 1);