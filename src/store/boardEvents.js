
const boardEvents = {
    state: () => ({
        boardEventTexts: []
    }),
    mutations: {
        addBoardEventItem(state, payload) {
            state.boardEventTexts.push(payload);
        },
        editBoardEventLastItem(state, payload) {
            state.boardEventTexts.splice(state.boardEventTexts.length-1, 1, payload);
        }    
    },
    actions: {
        createBoardEventItem(context, boardEventItem) {                                         
            context.commit('addBoardEventItem', boardEventItem);
        },
        updateLastBoardEventItem(context, boardEventItem) {                                         
            context.commit('editBoardEventLastItem', boardEventItem);
    }

    },
    getters: {
        boardEventItems: state => state.boardEventTexts
    }
};

export default boardEvents;