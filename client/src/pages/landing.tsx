import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/generated_images/Continental_Hotel_Luxury_Exterior_590b1b0a.png";
import deluxeRoom from "@assets/generated_images/Deluxe_King_Room_Interior_f44964f2.png";
import oceanSuite from "@assets/generated_images/Ocean_View_Suite_Interior_a985a0c3.png";
import executiveRoom from "@assets/generated_images/Executive_Business_Room_153fcf04.png";
import { Sparkles, Award, Clock } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Continental Hotel"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" data-testid="text-hero-title">
            Chào mừng đến Continental Hotel
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
            Trải nghiệm dịch vụ đẳng cấp với không gian sang trọng và những ưu đãi hấp dẫn
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/api/login" data-testid="link-get-started">
              <Button size="lg" className="text-lg px-8 backdrop-blur-sm bg-primary/90 hover:bg-primary border border-primary-border">
                Bắt đầu ngay
              </Button>
            </a>
            <a href="#features">
              <Button size="lg" variant="outline" className="text-lg px-8 backdrop-blur-md bg-background/20 border-white/30 text-white hover:bg-background/30">
                Khám phá thêm
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4" data-testid="text-features-title">
              Tại sao chọn Continental?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm tuyệt vời nhất cho quý khách
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-card-border">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Sang trọng & Tiện nghi</h3>
                  <p className="text-muted-foreground">
                    Phòng được thiết kế hiện đại với đầy đủ tiện nghi cao cấp
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Dịch vụ chuyên nghiệp</h3>
                  <p className="text-muted-foreground">
                    Đội ngũ nhân viên tận tâm phục vụ 24/7
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Ưu đãi hấp dẫn</h3>
                  <p className="text-muted-foreground">
                    Nhiều chương trình khuyến mãi đặc biệt cho khách hàng
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Featured Rooms */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Phòng nổi bật
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Khám phá các loại phòng sang trọng của chúng tôi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="overflow-hidden hover-elevate border-card-border">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={deluxeRoom}
                  alt="Deluxe Room"
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Phòng Deluxe</h3>
                <p className="text-muted-foreground text-sm">
                  Phòng rộng rãi với giường King size và view thành phố
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover-elevate border-card-border">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={oceanSuite}
                  alt="Ocean Suite"
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Suite Hướng biển</h3>
                <p className="text-muted-foreground text-sm">
                  Suite cao cấp với tầm nhìn tuyệt đẹp ra biển
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover-elevate border-card-border">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={executiveRoom}
                  alt="Executive Room"
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Phòng Executive</h3>
                <p className="text-muted-foreground text-sm">
                  Phòng dành cho doanh nhân với không gian làm việc riêng
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <a href="/api/login" data-testid="link-view-all-rooms">
              <Button size="lg">
                Xem tất cả phòng
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">Continental Hotel</h3>
            <p className="text-muted-foreground mb-4">
              Trải nghiệm dịch vụ khách sạn đẳng cấp 5 sao
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 Continental Hotel. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
