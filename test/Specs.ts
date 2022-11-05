import { expect } from 'chai';
import { describe } from 'mocha';
import { Factory } from '../src/FactoryDecorator';
import { Operations } from '../src/Operations';
import { RequestFactory } from '../src/RequestFactory';

class Foo {
	@Factory(123)
		bar: number;

	@Factory("Any string")
		baz: string;
}

class Tic {
	@Factory("A string")
		tac: number;

	@Factory(RequestFactory.createForClass(Foo).generate({}))
		toe: Foo;
}

describe("Specs operations", () => {
	it("uses Delete operation to remove an elment", () => {
		const request = RequestFactory.createForClass(Foo).generate({
			bar: Operations.Delete
		});

		expect(request).not.have.all.keys("bar");
	});

	it("uses Override operation to change a value of an elment", () => {
		const request = RequestFactory.createForClass(Foo).generate({
			bar: Operations.Override("new value")
		});

		expect(request.bar).to.equal("new value");
	});

	it("uses Override operation to add new elment", () => {
		const request = RequestFactory.createForClass(Foo).generate({
			boo: Operations.Override("new elemnt")
		});

		expect(request).have.all.keys(["bar", "baz", "boo"]);
		expect(request.boo).to.equal("new elemnt");
	});

	it("uses Add as an alias to Override operation", () => {
		const request = RequestFactory.createForClass(Foo).generate({
			boo: Operations.Add("new elemnt using Add")
		});

		expect(request).have.all.keys(["bar", "baz", "boo"]);
		expect(request.boo).to.equal("new elemnt using Add");
	});

	it("uses multiple operations", () => {
		const request = RequestFactory.createForClass(Tic).generate({
			tac: Operations.Delete,
			toe: Operations.Override(
				RequestFactory.createForClass(Foo)
					.generate({
						bar: Operations.Override(456)
					}))
		});

		expect(request).have.all.keys(["toe"]);
		expect(request.toe).have.all.keys(["bar", "baz"]);
	});
});