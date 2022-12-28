export abstract class AbstractStorageService {
  abstract get<T>(key: string): Promise<T>;
  abstract remove(key: string): Promise<void>;
  abstract save<T>(key: string, obj: T): Promise<void>;
}
