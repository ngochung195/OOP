class Vehicle {
    constructor(id, driverName, vehicleType = "Motorbike", status = "Active") {
        this.id = id;
        this.driverName = driverName;
        this.vehicleType = vehicleType;
        this.status = status;
    }

    calculateFare(distance) {
        if (this.status === "Maintenance") {
            console.log("Phương tiện đang bảo trì!");
            return;
        }

        let pricePerKm = 5000;

        if (this.vehicleType === "Car") {
            pricePerKm = 12000;
        } else if (this.vehicleType === "Truck") {
            pricePerKm = 20000;
        }

        return distance * pricePerKm;
    }
}

let vehicle1 = new Vehicle("V01", "Nguyen Van A"); // Sử dụng giá trị mặc định (Motorbike, Active)
let vehicle2 = new Vehicle("V02", "Tran Van B", "Car", "Maintenance");
let vehicle3 = new Vehicle("V03", "Le Thi C", "Truck", "Active");

console.log(`--- Thông tin và doanh thu ---`);

// --- KHỞI TẠO ĐỒNG LOẠT 10 ĐỐI TƯỢNG TỪ CLASS VEHICLE ---
const danhSachXe = [
    new Vehicle("V04", "Phạm Văn D", "Motorbike", "Active"),
    new Vehicle("V05", "Hoàng Thị E", "Car", "Active"),
    new Vehicle("V06", "Nguyễn Văn F", "Truck", "Active"),
    new Vehicle("V07", "Trần Thị G", "Motorbike", "Maintenance"),
    new Vehicle("V08", "Phan Văn H", "Car", "Active"),
    new Vehicle("V09", "Vũ Thị I", "Truck", "Active"),
    new Vehicle("V10", "Đặng Văn K", "Motorbike", "Active"),
    new Vehicle("V11", "Bùi Thị L", "Car", "Maintenance"),
    new Vehicle("V12", "Đỗ Văn M", "Truck", "Active"),
    new Vehicle("V13", "Hồ Thị N", "Motorbike", "Active")
];

// Giả định số km chạy tương ứng cho 10 xe trên để test tính tiền
const quangDuongTest = [5, 12, 50, 8, 25, 100, 15, 3.5, 75, 22];

console.log("\n=================== KIỂM TRA 10 ĐỐI TƯỢNG ĐƯỢC TẠO TỪ CLASS ===================");

danhSachXe.forEach((xe, index) => {
    let km = quangDuongTest[index];
    let tongTien = xe.calculateFare(km);

    let textHienThi = (tongTien !== undefined) ? `${tongTien.toLocaleString()} VND` : "Không thể tính tiền (Bảo trì)";

    console.log(`Xe số ${index + 1}: [Mã: ${xe.id}] | Tài xế: ${xe.driverName} | Loại xe: ${xe.vehicleType}`);
    console.log(`      ↳ Trạng thái: ${xe.status} | Chạy: ${km} km => Tính tiền: ${textHienThi}`);
    console.log("--------------------------------------------------------------------------------");
});