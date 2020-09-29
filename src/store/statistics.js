import axios from 'axios';
import * as Settings from '../settings';

const statistics = {
    state: () => ({
        summary: [],
        firstRun: false
    }),
    mutations: {
        setStatistics(state, payload) {    
            state.summary = payload.map(s => ({
                result: s.result,
                count: s.count
            }));
        },
        setFirstRun(state, payload) {    
            state.firstRun = payload;
        }        
    },
    actions: {        
        async fetchStatistics(context) {
            await axios.get('/stats?limit=' + Settings.STATISTICS_LIMIT)
                .then(function (response) {
                    context.commit('setStatistics', response.data);
                });
        },
        updateFirstRun(context, payload) {
           context.commit('setFirstRun', payload);          
        },
    },
    getters: {
        summary: state => state.summary,
        firstRun: state => state.firstRun
    }
};

export default statistics;