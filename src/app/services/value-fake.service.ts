
export class ValueFakeService {
  private value = 'my value'

  constructor() {
  }

  getValue() {
    return 'fake value';
  }

  setValue(value: string) {
  }

  getPromiseValue() {
    return Promise.resolve('fake value');
  }


}
