import { FactoryValue } from "./FactoryValue";

export type Delete = 'delete'
export type Override = { op: 'override', value: FactoryValue }
export type Add = Override

export type Operation = Delete | Override | Add

export function isDeleteOp(op: Operation): op is Delete {
	return op === 'delete';
}

export function isOverride(op: Operation): op is Override {
	return typeof op === 'object' && op.op === 'override';
}