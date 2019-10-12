export interface ICache {
  get(): Promise<any>
  set(data: any): Promise<void>
  clear(): void
}
