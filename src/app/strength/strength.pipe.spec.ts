import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe', () => {
    it('should display weak if strength is 5', ()=> {
        let pipe = new StrengthPipe();

        let val = pipe.transform(5);
        expect(val).toEqual('5 (weak)');
    })

    it('should display strong if strength is 15', ()=> {
        let pipe = new StrengthPipe();

        let val = pipe.transform(15);
        expect(val).toEqual('15 (strong)');
    })

    it('should display unbelievable if strength is 25', ()=> {
        let pipe = new StrengthPipe();

        let val = pipe.transform(25);
        expect(val).toEqual('25 (unbelievable)');
    })
});