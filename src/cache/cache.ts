import {ICache} from "./interfaces";

export default class Cache implements ICache {
  private data: any

  public async get() {

      return this.data
  }

  public async set(data: any) {
    this.data = data
  }

  public clear() {
    this.data = undefined
  }
}
