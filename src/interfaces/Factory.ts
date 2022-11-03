import { FactoryValue } from "./FactoryValue";
import { Spec } from "./Spec";


export interface Factory {
    generate(spec?: Spec): Record<string, FactoryValue>
}