import { PropertyMeta } from "./interfaces/PropertyMeta";

export class FactoryMetaStorage {
	private properties = new Array<PropertyMeta>();

	addPropertyMeta(pm: PropertyMeta) {
		this.properties.push(pm);
	}

	getPropertyMetaByTarget(target: unknown): PropertyMeta[] {
		return this.properties.filter(p => p.target === target);
	}
}

const globalVar = global as any;
export const FactoryStorage: FactoryMetaStorage = globalVar.factoryStorage || (globalVar.factoryStorage = new FactoryMetaStorage());