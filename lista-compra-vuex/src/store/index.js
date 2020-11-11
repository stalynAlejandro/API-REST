import Vue from 'vue';
import Vuex from 'vuex';
import Unidades from '../util/Unidades';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        idActual: 2,
        lista: [
            { id: 1, nombre: "patatas", cantidad: 2, unidades: Unidades.KG },
            { id: 2, nombre: 'ron', cantidad: 1, unidades: Unidades.BOTTELLA }
        ]
    },
    mutations: {
        addItem(state, item) {
            state.idActual++;
            item.id = state.idActual;
            state.lista.push(item);
        },
        delItem(state, itemId) {
            state.lista = state.lista.filter((i) => i.id != itemId)
    }
}
})