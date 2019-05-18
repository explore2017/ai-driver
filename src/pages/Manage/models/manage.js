import { showSubjectStudent, queryRule, removeRule, addRule, updateRule } from '@/services/api';

export default {
  namespace: 'manage',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *showSubjectStudent({ payload }, { call, put }) {
    console.log("sdfke")
    const response = yield call(showSubjectStudent, payload);
    yield put({
      type: 'save',
      payload: response,
    });
  },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      console.log(action.payload.data)
      return {
        ...state,
        list:action.payload.data,
        // data:{
        //   list:action.payload.data,
        // } 
      };
    },
  },
};
