import {ICache} from './interfaces'

export default class Cache implements ICache {
  private data: any

  public get() {
      return this.data
  }

  public set(data: any) {
    this.data = data
  }
}
