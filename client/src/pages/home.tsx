import { useEffect } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@assets/generated_images/Continental_Hotel_Luxury_Exterior_590b1b0a.png";
import { FileText, Tag, User, ArrowRight } from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Chưa đăng nhập",
        description: "Bạn cần đăng nhập để tiếp tục...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Welcome Hero */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Continental Hotel"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        
        <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" data-testid="text-welcome">
            Xin chào, {user?.firstName || user?.email}!
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
            Chào mừng bạn quay trở lại Continental Hotel
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 md:px-6 -mt-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-card-border hover-elevate">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Bài đăng</CardTitle>
                  <CardDescription>Khám phá các phòng khách sạn</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Xem danh sách các phòng có sẵn và tìm kiếm theo tag
              </p>
              <Link href="/posts" data-testid="link-posts">
                <Button className="w-full gap-2">
                  <span>Xem bài đăng</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-card-border hover-elevate">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Tag className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Khuyến mãi</CardTitle>
                  <CardDescription>Ưu đãi đặc biệt cho bạn</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Tìm kiếm và áp dụng mã giảm giá cho đặt phòng
              </p>
              <Link href="/promotions" data-testid="link-promotions">
                <Button className="w-full gap-2">
                  <span>Xem khuyến mãi</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-card-border hover-elevate">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Tài khoản</CardTitle>
                  <CardDescription>Quản lý thông tin cá nhân</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Cập nhật thông tin và cài đặt tài khoản
              </p>
              <Link href="/profile" data-testid="link-profile">
                <Button variant="secondary" className="w-full gap-2">
                  <span>Xem hồ sơ</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-4 md:px-6 mt-16">
        <Card className="border-card-border bg-muted/30">
          <CardHeader>
            <CardTitle className="text-2xl">Thông tin hữu ích</CardTitle>
            <CardDescription>
              Một số điểm nổi bật về dịch vụ của chúng tôi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Giờ nhận phòng</h3>
                <p className="text-sm text-muted-foreground">
                  Check-in: 14:00 | Check-out: 12:00
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dịch vụ đặc biệt</h3>
                <p className="text-sm text-muted-foreground">
                  Bể bơi, Gym, Spa, Nhà hàng 5 sao
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Liên hệ</h3>
                <p className="text-sm text-muted-foreground">
                  Hotline: 1900-xxxx | Email: info@continental.com
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Vị trí</h3>
                <p className="text-sm text-muted-foreground">
                  Trung tâm thành phố, gần các điểm du lịch
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
