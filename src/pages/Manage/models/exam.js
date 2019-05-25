import { showSubjectStudent, showStudentExam, reviewSubjectStudent, deleteSubjectStudent, queryRule, removeRule, addRule, updateRule } from '@/services/api';

export default {
  namespace: 'exam',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *showSubjectStudent({ payload }, { call, put }) {
      const response = yield call(showSubjectStudent, payload);
      yield put({
        type: 'saveSubjectStudent',
        payload: response,
      });
    },
    *showStudentExam({ payload }, { call, put }) {
      const response = yield call(showStudentExam, payload);
      yield put({
        type: 'saveSubjectStudent',
        payload: response,
      });
    },
    *reviewSubjectStudent({ payload }, { call, put }) {
      const response = yield call(reviewSubjectStudent, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
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
    saveSubjectStudent(state, action) {
      // console.log(action.payload.data)
      return {
        ...state,
        // list:action.payload.data,
        data:{
          list:action.payload.data,
        }, 
      };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
