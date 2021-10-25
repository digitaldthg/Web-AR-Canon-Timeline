import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        targets:[], //targets that are defined in CanonData.json
        interfaceStates:{
            ARState:'AR',
            ModelState:'3DModel',
            TextState:'Text',
            VideoState:'Video',
            ImageState:'Images',
            MapState:'Map'
        },
        currentTargetID: null,
        currentInterfaceState: 'AR',
        isVisible: false //one target is selected?
    },

    actions: {
        fetchData({
          commit
        }) {
          axios
            .get("assets/CanonData.json")
            .then(response => {
              commit('setData', response.data);
            })
            .catch(error => {
              console.log('error:', error);
            });
        }
      },

    mutations: {
        setData: (state, targets) => {
            state.targets = targets;
        },
        setCurrentTargetID(state, id) {
            this.state.currentTargetID = id;
            this.state.isVisible = true;
        },
        setVisible(state, isVisible) {
            this.state.isVisible = isVisible;
            
            if(!isVisible){
              this.state.currentTargetID = null;
              this.state.currentInterfaceState =  'AR';
            }
        },
        setCurrentInterfaceState(state, interfaceState) {
            this.state.currentInterfaceState = interfaceState;
        }
    }

})