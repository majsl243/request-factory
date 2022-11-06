# Request Factory
## About
This library is inspired by and based on [nestjs Seeder](https://github.com/edwardanthony/nestjs-seeder) with customizations to support payloads generation for API testing. The customization includes adding few operations to remove, add and delete elments from payloads as required.

## How to Use?
### 1- Install the package
npm install request-payload-factory --save-dev

### 2- Define Model class
The model class will represent the payload you want to generate. As an example, our model class will be "User", but it can be any class custom class.

```typescript
import { Factory } from "request-payload-factory";

export class User {
    @Factory("User Name")
    name: string;
    
    @Factory("0512345678")
    phonenumber: string;
    
    @Factory("Main st. B1")
    address: string;
}
```

Notice that `@Factory` decorator is used to specify the value for each field. This value will be used when generating payload for the class.

`@Factory` supports multiple types:
#### Static value:
The value can be of any of the basic types ```string, number, boolean or date ```
```typescript
    @Factory("User Name")
    name: string;
```

#### Faker generated value:
```typescript
    @Factory((faker) => faker.phone.imei())
    phonenumber: string;
```

#### Custom function:
```typescript
    @Factory(() => {
      const st = "Main st."
      const buildingNum = "B1"
      return `${st} ${buildingNum}`;
    })
    address: string;
```

### 3- Generating payload for a class:
Using ```createForClass``` to create ```generate()``` that will return the complete payload based on ```@Factory``` decorator.

```typescript
import { RequestFactory } from 'request-payload-factory';

const requestPayload = RequestFactory.createForClass(User).generate({});
```

### 4- Customizing generated payload:
```generate()``` function take an optional parameter to specify the specs for the payload. Specs are set of defined rules to delete, add, or ovverirde a field in the generated payload.

#### There are 3 types of operations
1. Delete  
   - Takes no parameters  
2. Override  
   - Takes one parameter to specify the new value
3. Add
   - An alias to ovverride and behaves exactly the same
    
#### Example:    

```typescript
import { Operations, RequestFactory } from 'request-payload-factory';

const requestPayload = 
  RequestFactory.createForClass(User).generate({
    name: Operations.Override("Another Name"),
    phoneNumber: Operations.Delete,
    workAddress: Operations.Add("Another st Floor 5"),
  });
```

## Advanced Usage
### Field of type of another custom Class
We will refer to the following two classes as an example for advanced usage, but you can apply it to any custom class:

```typescript
import { Operations, RequestFactory } from 'request-payload-factory';

export class Trip {
    @Factory("Trip Name")
    name: string;
    
    @Factory("Trip organizaer name")
    organizer: string;
    
    @Factory([
    RequestFactory.createForClass(Attraction).generate({})
    ])
    attraction: Attraction[];
}

export class Attraction {
    @Factory("Attraction Name")
    name: string;
    
    @Factory("Details of the attraction goes here")
    details: string;
}

const requestPayload = RequestFactory.createForClass(Trip).generate({});

```

  
