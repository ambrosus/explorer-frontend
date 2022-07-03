import { makeAutoObservable } from 'mobx';

class Bundle {
  bundleData = null;
  constructor() {
    makeAutoObservable(this);
  }
}

export default new Bundle();
