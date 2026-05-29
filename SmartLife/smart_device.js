/**
 * HỆ THỐNG QUẢN LÝ THIẾT BỊ IOT - SMARTLIFE (LEGACY CODE)
 */

class SmartDevice {
    static nextId = 1;
    constructor(deviceName, type) {
        this.deviceId = SmartDevice.nextId++;
        this.deviceName = deviceName;
        this.type = type;
        this.isOn = false;
        this.battery = 100;
    }
}


function checkDeviceStatus(device) {
    console.log(`Thiết bị ${device.deviceName} đang ở trạng thái: ${device.isOn ? "BẬT" : "TẮT"}`);
}

let livingRoomLamp = new SmartDevice("Đèn phòng khách", "Light");


let bedroomAC = new SmartDevice("Điều hòa phòng ngủ", "AirConditioner");

let kitchenFan = new SmartDevice("Quạt nhà bếp", "Fan");

checkDeviceStatus(livingRoomLamp);
checkDeviceStatus(bedroomAC);
checkDeviceStatus(kitchenFan);

console.log(livingRoomLamp);
console.log(bedroomAC);
console.log(kitchenFan);