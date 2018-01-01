import {AsyncStorage} from 'react-native'
export const DECKS_KEY = 'decks'

export function getDecks() {
    return AsyncStorage.getItem(DECKS_KEY)
    .then((rawResult) => JSON.parse(rawResult))
    .then(
        (result) =>{
            const key = Object.keys(result);
            return key.map((key) => result[key]);
        }
    )
}

export function getDeck(id) {
    return getDecks().then(
        (result) => result.filter((r) =>r.title === id)[0]
    )
}

// create a blank title.
export function addDeck(title){
    return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(
        {
            [title]:{
                title,
                questions: []
            }
        }
    ))
}

export function addCardToDeck(id, card){
    return getDeck(id)
    .then((deck) => {
        return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(
            {
               [id]: {
                   ...deck,
                   questions: deck.questions.concat(card)
               }
            }
        ))
    })
}