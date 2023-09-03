import axios from "axios"
import { LEAGUE_IDs } from "../constants.js"

const filter = fixtures => {
    let _fixtures = {
        epl : "None",
        la_liga : "None",
        seria_a : "None",
        bundesliga : "None",
        ligue_1 : "None",
        uefa_champions_league : { Events : [] },
        uefa_europa_league : { Events : [] }
    }

    for (let fixture of fixtures) {
        if(fixture.CompId == LEAGUE_IDs[0][2]) {
            _fixtures.epl = fixture
        } else if(fixture.CompId == LEAGUE_IDs[1][2]) {
            _fixtures.la_liga = fixture
        } else if(fixture.CompId == LEAGUE_IDs[2][2]) {
            _fixtures.seria_a = fixture
        } else if(fixture.CompId == LEAGUE_IDs[3][2]) {
            _fixtures.bundesliga = fixture
        } else if(fixture.CompId == LEAGUE_IDs[4][2]) {
            _fixtures.ligue_1 = fixture
        } else if(fixture.CompId == LEAGUE_IDs[5][2]) {
            let _event = _fixtures.uefa_champions_league.Events.concat(fixture.Events)
            _fixtures.uefa_champions_league.Events = _event
        } else if(fixture.CompId == LEAGUE_IDs[6][2]) {
            let _event = _fixtures.uefa_europa_league.Events.concat(fixture.Events)
            _fixtures.uefa_europa_league.Events = _event
        } else {
            continue
        }
    }

    return _fixtures
}

const _filter = (fixtures, league_id, eid) => {
    let _event = "None"
    
    for (let fixture of fixtures) {
        if(fixture.CompId == league_id) {
            for (let game of fixture.Events) {
                if(game.Eid == eid) {
                    _event = game
                } else {
                    continue
                }
            }
        } else {
            continue
        }
    }

    return _event
}

export const fixtures = async (key, host, date) => {
    const options = {
        method: 'GET',
        url: 'https://livescore6.p.rapidapi.com/matches/v2/list-by-date',
        params: {
            Category: 'soccer',
            Date: date,
            Timezone: "1"
        },
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': host
        }
    }
      
    try {
        const response = await axios.request(options)

        const games = filter(response.data.Stages)

        return games
    } catch (error) {
        console.error(error)
    }
}

export const stats = async (key, host, eid) => {
    const options = {
        method: 'GET',
        url: 'https://livescore6.p.rapidapi.com/matches/v2/get-incidents',
        params: {
            Category: 'soccer',
            Eid: eid,
            Timezone: "1"
        },
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': host
        }
    }
      
    try {
        const response = await axios.request(options)

        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const event = async (key, host, date, league_id, eid) => {
    const options = {
        method: 'GET',
        url: 'https://livescore6.p.rapidapi.com/matches/v2/list-by-date',
        params: {
            Category: 'soccer',
            Date: date,
            Timezone: "1"
        },
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': host
        }
    }
      
    try {
        const response = await axios.request(options)

        const game = _filter(response.data.Stages, league_id, eid)

        return game
    } catch (error) {
        console.error(error)
    }
}