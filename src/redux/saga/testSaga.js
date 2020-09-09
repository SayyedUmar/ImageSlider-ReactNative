import { takeEvery, call, put } from 'redux-saga/effects';
import { API_SUCCESS, IS_LOADING, API_ERROR, DATA_REQUESTED } from '../actions/types';
import { fetchImages } from '../../axios';

export default function* watcherSaga() {
  yield takeEvery(DATA_REQUESTED, workerSaga);
}

function* workerSaga() {
  
  try {
    // yield put({ type: IS_LOADING, data:'' })
    const data = yield call(fetchImages)
    yield put({ type: API_SUCCESS, data })
  } catch (e) {
    yield put({ type: API_ERROR, data: e })
  }
}


