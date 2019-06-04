//%color=#50F72E icon="\uf72e" block="anemometer"
namespace anemometer{
    const pi: number = 3.14;
    const r: number = 0.075;
    const N: number = 20;

    let n: number = 0;
    let v: number = 0;

    function cal(t: number) {
        const threshold: number = 1.3;
        v = 2 * pi * r * n / N / t;
        if (v != 0) v += threshold;
    }

    /**
     * Return wind speed in m/s.
     * @param t time interval; eg: 1, 2, 3, 5, 10
     */
    //%block="Wind Speed time interval (s) %t "
    export function speed(t: number): number {
        n = 0;
        basic.pause(t * 1000);
        cal(t);
        return v;
    }

    pins.onPulsed(DigitalPin.P2, PulseValue.High, function () {
        n++;
    })
}