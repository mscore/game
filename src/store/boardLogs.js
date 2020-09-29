 const boardLogs = {
    state: () => ({
        logItems: []
    }),
    mutations: {
        addBoardLogItem(state, payload) {
            var now = new Date();             
            state.logItems.push(now.toISOString() +' ' + payload);
        }   
         
    },
    actions: {
        createBoardLogItem(context, boardlogItem) {                                         
            context.commit('addBoardLogItem', boardlogItem);
        }    
    },
    getters: {
        logItems: state => state.logItems
    }
};

export default boardLogs;