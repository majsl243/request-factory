import { FactoryValue, FactoryValueGenerator } from "./interfaces/FactoryValue";
import { FactoryStorage } from "./MetadataStorage";

export function Factory(
	arg: FactoryValue | FactoryValueGenerator | Record<string, FactoryValue> | Array<Record<string, FactoryValue>>) {
	return (target: Record<string, any>, propertyKey: string) => {
		FactoryStorage.addPropertyMeta ({
			target: target.constructor,
			propertyKey,
			arg
		});
	};
}