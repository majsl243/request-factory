import { faker } from "@faker-js/faker";
import { Factory } from "./interfaces/Factory";
import { FactoryValue, FactoryValueGenerator } from "./interfaces/FactoryValue";
import { isDeleteOp, isOverride } from "./interfaces/Operations";
import { PropertyMeta } from "./interfaces/PropertyMeta";
import { Spec } from "./interfaces/Spec";
import { FactoryStorage } from "./MetadataStorage";

function isFactoryValueGenerator(arg: unknown): arg is FactoryValueGenerator {
	return typeof arg === 'function';
}

export class RequestFactory {
	static createForClass(target: any): Factory {
		if (!target) {
			throw new Error(
				`Target class ${target} is undefined`);
		}

		const props = FactoryStorage.getPropertyMetaByTarget(target);


		return {
			generate(spec: Spec = {}): Record<string, FactoryValue> {
				const req = RequestFactory.generate(props);
				return RequestFactory.applySpec(req, spec);
			}
		};
	}

	private static generate(
		props: PropertyMeta[],
	) : Record<string, FactoryValue> {
		return props.reduce(
			(r, p)=> ({
				[p.propertyKey]: isFactoryValueGenerator(p.arg) ? p.arg(faker) : p.arg,
				...r
			}), {});
	}

	private static applySpec(req: Record<string, FactoryValue>, spec: Spec): Record<string, FactoryValue>  {
		return Object.entries(spec).reduce((acc, [popertyKey, operation])=> {
			if (isDeleteOp(operation)) {
				const {[popertyKey]: _ignored, ...rest} = acc;
				return rest;
			}

			if (isOverride(operation)) {
				return {...acc, [popertyKey]: operation.value};                
			}

			return acc;
		}, {...req});
	}
}