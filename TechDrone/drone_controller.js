/**
 * HỆ THỐNG ĐIỀU KHIỂN TECHDRONE (SECURE VERSION)
 */
class SecureDrone {
    #id;
    #altitude;
    #battery;

    static MAX_ALTITUDE = 120;
    static MIN_ALTITUDE = 0;
    static BATTERY_PER_METER = 0.5;

    constructor(id) {
        this.#id = id;
        this.#altitude = 0;
        this.#battery = 100;
    }


    changeAltitude(meters) {
        if (this.#battery <= 0) {
            console.error(`[CẢNH BÁO NGUY HIỂM] Drone ${this.#id} hết pin! Từ chối nhận lệnh bay.`);
            return false;
        }

        if (typeof meters !== 'number') {
            console.error('Độ cao không hợp lệ! Từ chối nhận lệnh bay.');
            return false;
        }

        let targetAltitude = this.#altitude + meters;

        if (targetAltitude > SecureDrone.MAX_ALTITUDE) {
            console.warn(`[Hạn chế] Không thể bay quá trần an toàn ${SecureDrone.MAX_ALTITUDE}m. Tự động điều chỉnh về ${SecureDrone.MAX_ALTITUDE}m.`);
            targetAltitude = SecureDrone.MAX_ALTITUDE;
        } else if (targetAltitude < SecureDrone.MIN_ALTITUDE) {
            console.warn(`[Hạn chế] Không thể bay thấp hơn mặt đất (${SecureDrone.MIN_ALTITUDE}m). Tự động hạ cánh.`);
            targetAltitude = SecureDrone.MIN_ALTITUDE;
        }

        const actualDistance = Math.abs(targetAltitude - this.#altitude);
        const batteryCost = actualDistance * SecureDrone.BATTERY_PER_METER;

        if (this.#battery < batteryCost) {
            const achievableDistance = this.#battery / SecureDrone.BATTERY_PER_METER;
            const direction = meters > 0 ? 1 : -1;
            this.#altitude += achievableDistance * direction;
            this.#battery = 0;
            console.error(`[CẠN PIN] Drone ${this.#id} đã hết pin giữa chừng! Đang giữ độ cao khẩn cấp tại: ${this.#altitude}m.`);
            return false;
        }

        this.#altitude = targetAltitude;
        this.#battery -= batteryCost;
        return true;
    }

    flyUp(meters) {
        if (meters <= 0) return console.log("Số mét bay lên phải lớn hơn 0");
        console.log(`\n--- Lệnh: Bay lên ${meters}m ---`);
        this.changeAltitude(meters);
    }

    flyDown(meters) {
        if (meters <= 0) return console.log("Số mét bay xuống phải lớn hơn 0");
        console.log(`\n--- Lệnh: Bay xuống ${meters}m ---`);
        this.changeAltitude(-meters);
    }

    getStatus() {
        return {
            id: this.#id,
            altitude: `${this.#altitude}m`,
            battery: `${this.#battery.toFixed(1)}%`
        };
    }
}

// ========================================================
// CHẠY KỊCH BẢN KIỂM THỬ (TEST SCRIPTS)
// ========================================================

// 1. Khởi tạo Drone
const deliveryDrone = new SecureDrone("DRN-99");
console.log("=== KHỞI TẠO DRONE THÀNH CÔNG ===");
console.log("Trạng thái đầu:", deliveryDrone.getStatus());

// 2. Vận hành thông thường: Bay lên 50m, bay xuống 20m
deliveryDrone.flyUp(50);
deliveryDrone.flyDown(20);
console.log("Trạng thái sau khi bay:", deliveryDrone.getStatus());


console.log("\n=== BẮT ĐẦU CHIẾN DỊCH HACK DRONE ===");

// Thao tác hack 1: Gán thẳng #altitude = 1000 bên ngoài class
try {
    // Nếu cố tình viết code này, JavaScript sẽ báo lỗi cú pháp ngay lập tức và dừng chương trình.
    // Để chứng minh nó được bảo vệ, ta đặt trong block try-catch hoặc dùng cách gán thuộc tính giả lập:
    deliveryDrone.altitude = 1000;
    console.log("[HACK 1] Thử gán biến công khai 'altitude = 1000'...");
    console.log("-> Kết quả thực tế của Drone:", deliveryDrone.getStatus());
    // Hệ thống không hề hấn gì, vì thuộc tính private thực sự (#altitude) vẫn được giấu kín.
} catch (err) {
    console.log("-> Thất bại! Hệ thống chặn cứng từ vòng gửi xe:", err.message);
}

// Thao tác hack 2: Bắt Drone bay lên 200m trong 1 lần gọi (Vượt trần 120m)
deliveryDrone.flyUp(200);
console.log("-> Trạng thái sau khi hack bay quá trần:", deliveryDrone.getStatus());
// Kết quả: Drone chỉ lên tới 120m và dừng lại an toàn.

// Thao tác hack 3: Truyền chữ "mười mét" vào hàm bay (Phá hoại kiểu dữ liệu)
deliveryDrone.flyUp("mười mét");
console.log("-> Trạng thái sau khi truyền chữ vào hàm:", deliveryDrone.getStatus());
// Kết quả: Lệnh bị từ chối từ bước check `typeof`, drone giữ nguyên trạng thái an toàn, không bị sập (Crash).