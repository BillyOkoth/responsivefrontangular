import { PayerPipe } from './payer.pipe';

describe('PayerPipe', () => {
  it('create an instance', () => {
    const pipe = new PayerPipe();
    expect(pipe).toBeTruthy();
  });
});
