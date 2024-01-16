import {Calculator} from "./calculator";

describe('test for Calculator', () => {

  it('#multiply should return a nine', () => {
    // AAA
    // Arange
    const calculator = new Calculator()
    // Act
    const rta = calculator.multiply(3, 3)
    // Asert
    expect(rta).toEqual(9)
  })
  it('#multiply should return a four', () => {
    const calculator = new Calculator()
    const rta = calculator.multiply(1, 4)
    expect(rta).toEqual(4)
  })
  it('#divide should return a some numbers', () => {
    const calculator = new Calculator()
    const rta1 = calculator.divide(6, 3)
    const rta2 = calculator.divide(5, 2)
    expect(rta1).toEqual(2)
    expect(rta2).toEqual(2.5)
  })

  it('Test matchers', () => {
    let name = 'brandon'
    let name2

    expect(name).toBeDefined()
    expect(name2).toBeUndefined()
    expect(1 + 3 === 4).toBeTruthy()
    expect('123456').toMatch(/123/)
    expect(['orange', 'apple']).toContain('orange')
  })

})
