import { FactoryValue, FactoryValueGenerator } from "./FactoryValue";

export interface PropertyMeta {
    target: Function
    propertyKey: string
    arg: FactoryValue | FactoryValueGenerator | Record<string, FactoryValue>   
}