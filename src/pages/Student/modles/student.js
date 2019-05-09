import { addSubjectStudent } from '@/services/api';

export default {
  namespace: 'student',

  state: {
    list: [],
  },

  effects: {
    *addSubjectStudent({ payload }, { call, put }) {
      console.log('22222');
      const response = yield call(addSubjectStudent, payload);
      console.log('11111');
      yield put({
        type: 'addSubjectStudent',
        payload: Array.isArray(response) ? response : [],
      });
    },
    // *fetch({ payload }, { call, put }) {
    //   const response = yield call(queryFakeList, payload);
    //   yield put({
    //     type: 'queryList',
    //     payload: Array.isArray(response) ? response : [],
    //   });
    // },
    // *submit({ payload }, { call, put }) {
    //   let callback;
    //   if (payload.id) {
    //     callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
    //   } else {
    //     callback = addFakeList;
    //   }
    //   const response = yield call(callback, payload); // post
    //   yield put({
    //     type: 'queryList',
    //     payload: response,
    //   });
    // },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
