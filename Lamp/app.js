class ElectricLamp {
    constructor() {
        this.status = false;
    }

    turnOn() {
        this.status = true;
    }

    turnOff() {
        this.status = false;
    }

    showStatus() {
        if (this.status) {
            console.log('Bóng đền đang sáng!');
        } else {
            console.log('Bóng đèn đang tắt!');
        }
    }
}

class SwitchButton {
    constructor() {
        this.status = false;
        this.lamp = null;
    }

    connectToLamp(electricLamp) {
        this.lamp = electricLamp;
    }

    switchOn() {
        this.status = true;
        if (this.lamp) {
            this.lamp.turnOn();
        }
    }

    switchOff() {
        this.status = false;
        if (this.lamp) {
            this.lamp.turnOff();
        }
    }
}

let myLamp = new ElectricLamp();
let mySwitch = new SwitchButton();

mySwitch.connectToLamp(myLamp);

console.log("--- BẮT ĐẦU MÔ PHỎNG BẬT/TẮT 10 LẦN ---");

for (let i = 1; i <= 10; i++) {
    console.log(`\nLần lặp thứ ${i}:`);

    console.log("-> Bật công tắc:");
    mySwitch.switchOn();
    myLamp.showStatus();

    console.log("-> Tắt công tắc:");
    mySwitch.switchOff();
    myLamp.showStatus();
}