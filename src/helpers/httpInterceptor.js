import axios from 'axios';
import store from '@/store';


export default function execute() {
    axios.interceptors.request.use(function(config) {
       config.baseURL = store.getters.apiUrl;  // bad practise...
       store.dispatch("createBoardLogItem", "GET... " + config.url);  
       return config;
    }, function(err) {
        return Promise.reject(err);
    });
}