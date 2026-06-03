/**
 * HỆ THỐNG TECHHOME 
 */

class SmartLight {
    constructor(id) {
        this.id = id;
        this.isOn = false;
    }

    turnOn() {
        if (!this.isOn) {
            this.isOn = true;
            console.log(`[${this.id}] Đèn SmartLight đã BẬT.`);
        } else {
            console.log(`[${this.id}] Đèn đang bật sẵn rồi.`);
        }
    }

    turnOff() {
        if (this.isOn) {
            this.isOn = false;
            console.log(`[${this.id}] Đèn SmartLight đã TẮT.`);
        } else {
            console.log(`[${this.id}] Đèn đang tắt sẵn rồi.`);
        }
    }
}

class MotionSensor {
    constructor(id) {
        this.id = id;
        this.linkedDevice = null;
    }

    connectDevice(deviceObject) {
        this.linkedDevice = deviceObject;
        console.log(`[${this.id}] Đã kết nối thành công với thiết bị: ${deviceObject.id}`);
    }

    trigger() {
        console.log(`\n[${this.id}] CẢNH BÁO: Phát hiện có chuyển động!`);

        if (this.linkedDevice) {
            this.linkedDevice.turnOn();
        } else {
            console.log(`[${this.id}] Cảnh báo: Chưa cấu hình thiết bị liên kết để xử lý.`);
        }
    }
}

// --- KHỞI TẠO VÀ CHẠY THỬ NGHIỆM ---

// // Bước 1: Tạo ra các thực thể (Instances) cụ thể
// const livingRoomLight = new SmartLight("L01");
// const motionSensor = new MotionSensor("S01");

// // Bước 2: Thiết lập mối quan hệ giữa các đối tượng
// motionSensor.connectDevice(livingRoomLight);

// // Bước 3: Giả lập sự kiện (Event-driven thay vì dùng Vòng lặp)
// // Khi có người bước qua, cảm biến tự kích hoạt hành vi của chính nó
// motionSensor.trigger();

/**
 * KỊCH BẢN KIỂM THỬ: LIÊN KẾT VÀ ĐỔI THIẾT BỊ ĐIỀU KHIỂN
 */

// --- 1. KHỞI TẠO CÁC INSTANCES ---
console.log("--- BƯỚC 1: KHỞI TẠO THIẾT BỊ ---");
const light1 = new SmartLight("LIGHT_01");
const light2 = new SmartLight("LIGHT_02");
const sensor1 = new MotionSensor("SENSOR_01");


// --- 2. LIÊN KẾT SENSOR1 VỚI LIGHT1 VÀ KÍCH HOẠT ---
console.log("\n--- BƯỚC 2: LIÊN KẾT SENSOR 1 VỚI ĐÈN 1 ---");
sensor1.connectDevice(light1);

// Kích hoạt lần 1
sensor1.trigger();

// Kiểm tra trạng thái thực tế của light1 và light2
console.log(`> Kiểm tra trạng thái Light 1 (isOn): ${light1.isOn}`); // Sẽ là true
console.log(`> Kiểm tra trạng thái Light 2 (isOn): ${light2.isOn}`); // Sẽ là false


// --- 3. ĐỔI LIÊN KẾT: GẮN LIGHT2 VÀO SENSOR1 VÀ KÍCH HOẠT LẠI ---
console.log("\n--- BƯỚC 3: ĐỔI LIÊN KẾT SANG ĐÈN 2 ---");
// Bản chất hàm connectDevice sẽ ghi đè thiết bị cũ (ngắt light1, nhận light2)
sensor1.connectDevice(light2);

// Trước khi kích hoạt lại, ta tắt light1 đi để nhìn rõ kết quả thử nghiệm
light1.turnOff();

// Kích hoạt lần 2
sensor1.trigger();

// Kiểm tra lại trạng thái cuối cùng của cả 2 đèn
console.log(`> Kiểm tra trạng thái Light 1 (isOn): ${light1.isOn}`); // Sẽ là false (vì đã tắt và không được sensor gọi nữa)
console.log(`> Kiểm tra trạng thái Light 2 (isOn): ${light2.isOn}`); // Sẽ là true (vì đã được liên kết mới)