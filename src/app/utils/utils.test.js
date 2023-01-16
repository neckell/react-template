import { cleanup } from '@testing-library/react';
import { camelToSnake } from './api-utils';
import { isNullOrEmpty } from './validations-utils';

afterEach(cleanup);

describe('Utils func', () => {
  it('should transform snake to camel', () => {
    let obj = {
      postal_code: "3100",
      main_address: "Av. Libertador 111",
    }
    let desired = {
      postalCode: "3100",
      mainAddress: "Av. Libertador 111",
    }
    const result = camelToSnake(obj);
    expect(result.postalCode === desired.postalCode).toBeTruthy();
    expect(result.mainAddress === desired.mainAddress).toBeTruthy();
  });
  it('should validate wrong input data', () => {
    let val1 = null; 
		let val2 = ""; 
		let val3 = undefined;
		let val4 = [];
		let val5 = {};
    expect(isNullOrEmpty(val1)).toBeTruthy();
    expect(isNullOrEmpty(val2)).toBeTruthy();
    expect(isNullOrEmpty(val3)).toBeTruthy();
    expect(isNullOrEmpty(val4)).toBeTruthy();
    expect(isNullOrEmpty(val5)).toBeTruthy();
  });
  it('should validate ok input data', () => {
    let val1 = 1;
		let val2 = "1";
    let val3 = false;
		let val4 = ['1'];
		let val5 = {'1': 1};
    let val6 = true;    
    expect(!isNullOrEmpty(val1)).toBeTruthy();
    expect(!isNullOrEmpty(val2)).toBeTruthy();
    expect(!isNullOrEmpty(val3)).toBeTruthy();
    expect(!isNullOrEmpty(val4)).toBeTruthy();
    expect(!isNullOrEmpty(val5)).toBeTruthy();
    expect(!isNullOrEmpty(val6)).toBeTruthy();
  });
});
