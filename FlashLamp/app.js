class Battery {
    #energy = 0;

    constructor(energy) {
        this.energy = energy;
    }

    get energy() {
        return this.#energy;
    }

    set energy(newEnergy) {
        if (newEnergy < 0) {
            console.log("Năng lượng không thể âm!");
            this.#energy = 0;
        } else if (newEnergy > 100) {
            console.log("Năng lượng không thể vượt quá 100%!");
            this.#energy = 100;
        } else {
            this.#energy = newEnergy;
        }
    }

    decreaseEnergy() {
        if (this.#energy > 0) {
            this.#energy--;
        }
    }
}

class FlashLamp {
    constructor() {
        this.status = false;
        this.battery = null;
    }

    setBattery(battery) {
        this.battery = battery;
    }

    getBatteryInfo() {
        if (this.battery) {
            return this.battery.energy;
        }
        return "Đèn chưa được lắp pin!";
    }

    light() {
        if (!this.battery) {
            console.log("Không thể sáng! Đèn chưa có pin.");
            return;
        }

        if (this.status && this.battery.energy > 0) {
            console.log("Đèn đang sáng...");
            this.battery.decreaseEnergy();
        } else if (this.status && this.battery.energy <= 0) {
            console.log("Hết pin rồi! Đèn tự động tắt.");
            this.status = false;
        } else {
            console.log("Đèn đang tắt.");
        }
    }

    turnOn() {
        this.status = true;
    }

    turnOff() {
        this.status = false;
    }
}

let battery = new Battery(10);

let flashLamp = new FlashLamp();
flashLamp.setBattery(battery);

document.write("Battery info:" + flashLamp.getBatteryInfo() + "<br/>");
flashLamp.light();

document.write("Turn on<br/>")
flashLamp.turnOn();
flashLamp.light();
document.write("Battery info:" + flashLamp.getBatteryInfo() + "<br/>");

document.write("Turn off<br/>")
flashLamp.turnOff();
flashLamp.light();