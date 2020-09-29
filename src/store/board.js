import axios from 'axios';

const board = {
    state: () => ({
        apiUrl: 'https://dev-games-backend.advbet.com/v1/ab-roulette/1', //should be moved to settings
        boardName: '',
        boardSlotCount: 0,
        boardSlots: [],
        boardSlotValues: [],
        boardSlotColors: [],

        nextGameData: {
            uuid: "00000000-0000-0000-0000-000000000000",
            id: 0,
            startTime: "1900-01-23T19:55:11.529Z",
            startDelta: 0,
            startDeltaUs: 0,
            fakeStartDelta: 0,
            duration: 0,
            result: null,
            outcome: "0"
        },
        newGameData:{
            uuid: "00000000-0000-0000-0000-000000000000",
            id: 0,
            startTime: "1900-01-23T19:55:11.529Z",
            startDelta: 0,
            startDeltaUs: 0,
            fakeStartDelta: 0,
            duration: 0,
            result: 0,
            outcome: "0"
        }
    }),
    mutations: {
        setApiUrl(state, payload) {
            state.apiUrl = payload;
        },
        setRouletteConfiguration(state, payload) {
            state.boardName = payload.name;
            state.boardSlotCount = payload.slots;
            state.boardSlots = payload.results;
            state.boardSlotValues = payload.positionToId;
            state.boardSlotColors = payload.colors;
        },

        setNextGameData(state, payload) {
            state.nextGameData.uuid = payload.uuid;
            state.nextGameData.id = payload.id;
            state.nextGameData.startTime = payload.startTime;
            state.nextGameData.startDelta = payload.startDelta;
            state.nextGameData.startDeltaUs = payload.startDeltaUs;
            state.nextGameData.fakeStartDelta = payload.fakeStartDelta;
            state.nextGameData.duration = payload.duration;
            state.nextGameData.result = payload.result;
            state.nextGameData.outcome = payload.outcome;
        },
        setNewGameData(state, payload) {
            state.newGameData.uuid = payload.uuid;
            state.newGameData.id = payload.id;
            state.newGameData.startTime = payload.startTime;
            state.newGameData.startDelta = payload.startDelta;
            state.newGameData.startDeltaUs = payload.startDeltaUs;
            state.newGameData.fakeStartDelta = payload.fakeStartDelta;
            state.newGameData.duration = payload.duration;
            state.newGameData.result = payload.result;
            state.newGameData.outcome = payload.outcome;
        },

        decreaseNextGameFakeStartDelta(state) {
            state.nextGameData.fakeStartDelta -= 1;
        }
    },
    actions: {        
        async fetchRouletteConfiguration(context) {
            await axios.get('/configuration')
                .then(function (response) {
                    context.commit('setRouletteConfiguration', response.data);
                });
        },

        async fetchNextGame(context) {
            await axios.get('/nextGame')
                .then(function (response) {
                    context.commit('setNextGameData', response.data);
                });
        },

        async fetchNewGame(context, gameId) {
            await axios.get('/game/' + gameId)
                .then(function (response) {
                    context.commit('setNewGameData', response.data);
                });
        },
        
        decreaseFakeStartDelta(context){
            context.commit('decreaseNextGameFakeStartDelta');
        },
        updateApiUrl(context, payload){
            context.commit('setApiUrl', payload);
        }
    },
    getters: {
        apiUrl: state => state.apiUrl,
        rouletteId: state => state.rouletteId,
        boardName: state => state.boardName,
        boardSlotCount: state => state.boardSlotCount,
        boardSlots: state => state.boardSlots,
        boardSlotValues: state => state.boardSlotValues,
        boardSlotColors: state => state.boardSlotColors,
        nextGameData: state => state.nextGameData,
        newGameData: state => state.newGameData,
    }
};

export default board;