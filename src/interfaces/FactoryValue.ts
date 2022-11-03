import {Faker} from '@faker-js/faker';

type BaseType = string | number | boolean | Date
export type FactoryValue = BaseType | Array<BaseType>
export type FactoryValueGenerator = (faker: Faker) => FactoryValue;
