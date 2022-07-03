import { makeAutoObservable } from 'mobx';

class Bundle {
  constructor() {
    makeAutoObservable();
  }
}

export default new Bundle();
