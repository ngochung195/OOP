class Drone{
    constructor(id, battery, status = "available"){
        this.id = id;
        this.battery = battery;
        this.status = status;
    }

    isFly(){
        return this.status === "available" && this.battery > 20;
    }

    takeOff(){
        this.status = "delivering";
        console.log(`[DRONE ${this.id}]: Đã nhận đơn và cất cánh!`);
    }
}

let droneFleet = [
    new Drone("D01", 100),
    new Drone("D02", 15, "charging"),
    new Drone("D03", 80, "delivering")
];

function addDrone(newDrone) {
    droneFleet.push(newDrone);
    console.log(`[HỆ THỐNG]: Đã thêm Drone ${newDrone.id} vào mảng quản lý.`);
}

function dispatchOrder(){
    let readyDrone = droneFleet.find(drone => drone.isFly());

    if (readyDrone){
        console.log(`[ĐIỀU PHỐI]: Tìm thấy Drone trống là ${readyDrone.id}. Thao tác đổi trạng thái...`);
        readyDrone.takeOff();
        return;
    }
    console.log("[CẢNH BÁO]: Không có Drone nào sẵn sàng!");
}

// =========================================================
// PHẦN XỬ LÝ: SINH TỰ ĐỘNG 20 OBJECTS DRONE ĐỂ TEST
// =========================================================

// Mảng các trạng thái ngẫu nhiên để hệ thống sinh động hơn
const statuses = ["available", "charging", "delivering", "maintenance"];

for (let i = 1; i <= 20; i++) {
    // 1. Tạo ID dạng: D01, D02, ..., D20
    let id = `D${i.toString().padStart(2, '0')}`;
    
    // 2. Sinh ngẫu nhiên lượng pin từ 10% đến 100%
    let randomBattery = Math.floor(Math.random() * 91) + 10; 
    
    // 3. Sinh ngẫu nhiên trạng thái từ mảng statuses
    let randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    // 4. Khởi tạo Object mới từ Class Drone
    let mockDrone = new Drone(id, randomBattery, randomStatus);
    
    // 5. Đẩy vào mảng quản lý thông qua hàm addDrone
    addDrone(mockDrone);
}

// --- CHẠY THỬ NGHIỆM VẬN HÀNH VỚI DỮ LIỆU ĐÃ SINH ---

console.log("--- DANH SÁCH 20 DRONE VỪA ĐƯỢC TỰ ĐỘNG SINH RA ---");
console.table(droneFleet); // Dùng console.table để xem danh sách 20 con cực kỳ gọn và đẹp

console.log("\n--- THỬ NGHIỆM ĐIỀU PHỐI 3 ĐƠN HÀNG LIÊN TIẾP ---");
dispatchOrder(); // Điều phối đơn 1: Tìm con "available" và pin > 20 đầu tiên
dispatchOrder(); // Điều phối đơn 2: Tìm con tiếp theo thỏa mãn
dispatchOrder(); // Điều phối đơn 3: Tìm con tiếp theo thỏa mãn

console.log("\n--- DANH SÁCH PHI ĐỘI SAU KHI ĐIỀU PHỐI ---");
console.table(droneFleet);