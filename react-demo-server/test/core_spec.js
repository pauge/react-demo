import {expect} from "chai";
import {List,Map} from "immutable";

import {setEntries, next, vote} from "../src/core.js"

describe("application logic" , () => {
    describe("setEntries", () => {
        const increment = (currentState) => currentState + 1;

        it("adds the entries to the state", () => {
            const state = new Map();
            const entries = ["It","Moon"];
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of("It","Moon")
            }));
        })
    });

    describe("next", () => {
        it("takes the next two entries under vote", () => {
            const state = Map({
                entries: List.of("It", "Moon", "Dogma")
            });

            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("It", "Moon")
                }),
                entries: List.of("Dogma")
            }));
        });
    });

    describe("vote", () => {
        it("creates a tally for the voted entry", () => {
            const state = Map({
                vote: Map({
                    pair: List.of("It", "Moon")
                }),
                entries: List()
            });
            const nextState = vote(state, "It");

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("It", "Moon"),
                    tally: Map({
                        "It": 1
                    })
                }),
                entries: List()
            }))
        })

        it("increments the existing tally for an entry", () => {
            const state = Map({
                vote: Map({
                    pair: List.of("It", "Moon"),
                    tally: Map({
                        "It": 1,
                        "Moon": 3
                    })
                }),
                entries: List()
            });
            const nextState = vote(state, "Moon");

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("It", "Moon"),
                    tally: Map({
                        "It": 1,
                        "Moon": 4
                    })
                }),
                entries: List()
            }));
        })
    });
});
