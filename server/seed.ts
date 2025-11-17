import { db } from "./db";
import { posts, promotions } from "@shared/schema";

// Image URLs - Served from public folder
const deluxeRoom = "/images/Deluxe_King_Room_Interior_f44964f2.png";
const oceanSuite = "/images/Ocean_View_Suite_Interior_a985a0c3.png";
const executiveRoom = "/images/Executive_Business_Room_153fcf04.png";
const promoBanner1 = "/images/Hotel_Promotion_Banner_Design_014b7bb6.png";
const promoBanner2 = "/images/Summer_Promotion_Banner_43ef32c1.png";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(posts);
  await db.delete(promotions);

  // Seed posts
  const samplePosts = [
    {
      title: "Phòng Deluxe King - Hướng thành phố",
      description: "Phòng rộng rãi với giường King size cao cấp, tầm nhìn tuyệt đẹp ra trung tâm thành phố. Trang bị đầy đủ tiện nghi hiện đại bao gồm TV màn hình phẳng, minibar, két an toàn, và phòng tắm với vòi sen mưa. Phù hợp cho cặp đôi hoặc khách doanh nhân.\n\nTiện nghi:\n- Giường King size cao cấp\n- TV màn hình phẳng 55 inch\n- WiFi tốc độ cao miễn phí\n- Minibar được bổ sung hàng ngày\n- Phòng tắm với đồ dùng cao cấp\n- Két an toàn điện tử\n- Bàn làm việc rộng rãi",
      imageUrl: deluxeRoom,
      tags: ["deluxe", "king bed", "city view", "couples"],
      price: 150,
    },
    {
      title: "Suite Hướng biển - Premium Ocean View",
      description: "Suite cao cấp với không gian sống riêng biệt, tầm nhìn panorama ra biển. Phòng ngủ rộng với giường King size, phòng khách sang trọng với sofa, và ban công riêng để thư giãn ngắm cảnh biển. Lựa chọn hoàn hảo cho kỳ nghỉ lãng mạn hoặc gia đình.\n\nĐặc biệt:\n- Tầm nhìn toàn cảnh biển\n- Phòng khách riêng biệt\n- Ban công lớn với ghế thư giãn\n- Bồn tắm Jacuzzi\n- Dịch vụ phòng 24/7\n- Complimentary breakfast\n- Late check-out miễn phí",
      imageUrl: oceanSuite,
      tags: ["suite", "ocean view", "luxury", "balcony", "romantic"],
      price: 350,
    },
    {
      title: "Phòng Executive - Dành cho doanh nhân",
      description: "Phòng được thiết kế đặc biệt cho khách doanh nhân với không gian làm việc rộng rãi, ghế công thái học, và đầy đủ thiết bị văn phòng. Bao gồm quyền truy cập Executive Lounge với buffet sáng và đồ uống suốt ngày.\n\nƯu đãi doanh nhân:\n- Bàn làm việc lớn với ghế công thái học\n- Máy in, scanner miễn phí\n- Truy cập Executive Lounge\n- Buffet sáng cao cấp\n- Họp phòng nhỏ miễn phí 2 giờ\n- Check-in/out nhanh\n- Giặt là express miễn phí",
      imageUrl: executiveRoom,
      tags: ["executive", "business", "workspace", "lounge access"],
      price: 200,
    },
    {
      title: "Phòng Deluxe Twin - Cho nhóm bạn",
      description: "Phòng với 2 giường đơn cao cấp, phù hợp cho nhóm bạn hoặc đồng nghiệp đi công tác. Không gian thoải mái với đầy đủ tiện nghi và view đẹp.\n\nTiện nghi:\n- 2 giường đơn cao cấp\n- Phòng tắm hiện đại\n- TV màn hình phẳng\n- WiFi miễn phí\n- Minibar\n- Két an toàn",
      imageUrl: deluxeRoom,
      tags: ["deluxe", "twin beds", "friends", "city view"],
      price: 140,
    },
    {
      title: "Junior Suite - Không gian thoải mái",
      description: "Suite junior với khu vực phòng ngủ và phòng khách được ngăn cách một phần, tạo không gian riêng tư mà vẫn thông thoáng. Lý tưởng cho kỳ nghỉ gia đình ngắn ngày.\n\nĐặc điểm:\n- Phòng rộng 45m²\n- Giường King size\n- Khu vực phòng khách\n- Sofa bed cho trẻ em\n- Bồn tắm lớn\n- View thành phố hoặc biển",
      imageUrl: oceanSuite,
      tags: ["suite", "family", "spacious", "sofa bed"],
      price: 250,
    },
    {
      title: "Premium Deluxe - Tầng cao view đẹp",
      description: "Phòng Deluxe nâng cấp ở tầng cao với view tuyệt đẹp và các tiện nghi bổ sung. Được thiết kế với tone màu ấm áp tạo cảm giác thư thái.\n\nNâng cấp đặc biệt:\n- Vị trí tầng cao (15-20)\n- Máy pha cà phê Nespresso\n- Đồ dùng phòng tắm L'Occitane\n- Gối và chăn cao cấp\n- Nâng cấp minibar\n- Welcome drink",
      imageUrl: executiveRoom,
      tags: ["deluxe", "premium", "high floor", "upgraded"],
      price: 180,
    },
  ];

  await db.insert(posts).values(samplePosts);
  console.log(`✓ Seeded ${samplePosts.length} posts`);

  // Seed promotions
  const samplePromotions = [
    {
      code: "SUMMER2024",
      title: "Ưu đãi mùa hè - Giảm 25% cho mọi đặt phòng",
      description: "Chương trình khuyến mãi đặc biệt mùa hè 2024! Giảm ngay 25% cho tất cả các loại phòng khi đặt trước ít nhất 7 ngày. Áp dụng cho kỳ nghỉ từ 2 đêm trở lên.\n\nƯu đãi bao gồm:\n- Giảm 25% giá phòng\n- Buffet sáng miễn phí\n- Late check-out đến 14:00\n- Miễn phí sử dụng hồ bơi và gym\n- Welcome drink khi check-in\n\nThời gian áp dụng: Cho các đêm lưu trú từ 01/06/2024 đến 31/08/2024",
      discountPercentage: 25,
      imageUrl: promoBanner2,
      validUntil: new Date("2024-08-31T23:59:59"),
    },
    {
      code: "EARLYBIRD",
      title: "Đặt sớm tiết kiệm - Giảm 20%",
      description: "Đặt phòng trước 30 ngày và nhận ngay ưu đãi 20%! Chương trình dành cho khách hàng có kế hoạch du lịch rõ ràng và muốn đảm bảo phòng ưng ý.\n\nĐiều kiện:\n- Đặt trước ít nhất 30 ngày so với ngày check-in\n- Thanh toán toàn bộ khi đặt\n- Không hoàn tiền khi hủy\n\nĐặc quyền:\n- Giảm 20% tổng giá trị\n- Đảm bảo loại phòng theo yêu cầu\n- Upgrade miễn phí nếu có phòng trống\n- Priority check-in",
      discountPercentage: 20,
      imageUrl: promoBanner1,
      validUntil: new Date("2025-12-31T23:59:59"),
    },
    {
      code: "WEEKEND15",
      title: "Cuối tuần vui vẻ - Giảm 15%",
      description: "Nghỉ dưỡng cuối tuần với giá ưu đãi! Giảm 15% cho các đặt phòng vào thứ 6, thứ 7, và chủ nhật.\n\nÁp dụng cho:\n- Các đêm từ thứ 6 đến chủ nhật\n- Tất cả các loại phòng\n- Đặt trước ít nhất 3 ngày\n\nTặng kèm:\n- Buffet sáng cho 2 người\n- Miễn phí parking\n- Voucher spa 10%",
      discountPercentage: 15,
      imageUrl: promoBanner2,
      validUntil: new Date("2025-06-30T23:59:59"),
    },
    {
      code: "LONGSTAY30",
      title: "Lưu trú dài ngày - Giảm đến 30%",
      description: "Chương trình dành riêng cho khách lưu trú dài ngày. Giảm 30% khi đặt từ 7 đêm trở lên.\n\nƯu đãi đặc biệt:\n- 7-13 đêm: Giảm 20%\n- 14-29 đêm: Giảm 25%\n- 30+ đêm: Giảm 30%\n\nDịch vụ bổ sung:\n- Giặt là miễn phí 2 lần/tuần\n- Dọn phòng hàng ngày\n- Minibar bổ sung\n- Flexible check-out",
      discountPercentage: 30,
      imageUrl: promoBanner1,
      validUntil: new Date("2025-12-31T23:59:59"),
    },
  ];

  await db.insert(promotions).values(samplePromotions);
  console.log(`✓ Seeded ${samplePromotions.length} promotions`);

  console.log("✅ Seeding completed!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
