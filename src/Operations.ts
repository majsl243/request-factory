import { Add, Override } from "./interfaces/Operations";

export const Operations: Record<string, any> = {
	Delete: 'delete',
	Override: (value): Override => ({op: "override", value}),
	Add: (value): Add => ({op: "override", value}),
}; 