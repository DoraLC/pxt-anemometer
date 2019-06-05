//%color=#50F72E icon="\uf121" block="anemometer"
namespace anemometer {
    const pi: number = 3.14;
    const r: number = 0.075;
    const N: number = 20;

    let n: number = 0;
    let v: number = 0;
    let pin_arg: DigitalPin = DigitalPin.P2;

    function cal(t: number) {
        const threshold: number = 1.3;
        v = 2 * pi * r * n / N / t;
        if (v != 0) v += threshold;
    }

    /**
     * Return wind speed in m/s.
     * @param t time interval; eg: 1, 2, 3, 5, 10
     * @param pinArg pin connected to the sensor; eg: DigitalPin.P2
     */
    //%block="Wind Speed time intervals(s) %t | pin %pinArg"
    export function speed(t: number, pinArg: DigitalPin): number {
        pin_arg = pinArg
        n = 0;
        basic.pause(t * 1000);
        cal(t);
        return v;
    }

    pins.onPulsed(pin_arg, PulseValue.High, function () {
        n++;
    })
}