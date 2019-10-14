export interface ICache {
  get(): any
  set(data: any): void
  clear(): void
}
