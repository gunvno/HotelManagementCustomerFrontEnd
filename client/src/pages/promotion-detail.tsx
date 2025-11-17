import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Copy, Calendar, Percent, Check } from "lucide-react";
import type { Promotion } from "@shared/schema";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useState } from "react";

export default function PromotionDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [copied, setCopied] = useState(false);


  const { data: promotion, isLoading } = useQuery<Promotion>({
    queryKey: ["/api/promotions", id],
    queryFn: () => fetch(`/api/promotions/${id}`).then(r => {
      if (!r.ok) throw new Error("Failed to fetch promotion");
      return r.json();
    }),
    enabled: isAuthenticated && !!id,
  });

  const copyCode = () => {
    if (promotion) {
      navigator.clipboard.writeText(promotion.code);
      setCopied(true);
      toast({
        title: "Đã sao chép!",
        description: "Mã khuyến mãi đã được sao chép vào clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen pb-12">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <Skeleton className="h-10 w-32 mb-8" />
          <Skeleton className="aspect-video w-full rounded-lg mb-8" />
          <div className="max-w-3xl mx-auto space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pb-12">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <Skeleton className="h-10 w-32 mb-8" />
          <Skeleton className="aspect-video w-full rounded-lg mb-8" />
          <div className="max-w-3xl mx-auto space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!promotion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Không tìm thấy khuyến mãi</p>
          <Link href="/promotions">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isExpired = new Date(promotion.validUntil) < new Date();

  return (
    <div className="min-h-screen pb-12">
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Back Button */}
        <Link href="/promotions" data-testid="link-back-to-promotions">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại danh sách</span>
          </Button>
        </Link>

        {/* Hero Image */}
        <div className="aspect-video overflow-hidden rounded-lg mb-8 relative">
          <img
            src={promotion.imageUrl}
            alt={promotion.title}
            className="h-full w-full object-cover"
            data-testid="img-promotion-detail"
          />
          <div className="absolute top-6 right-6">
            <Badge className="text-2xl font-bold px-6 py-2 bg-primary/90 backdrop-blur-sm">
              -{promotion.discountPercentage}%
            </Badge>
          </div>
          {isExpired && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-xl px-6 py-3">
                Đã hết hạn
              </Badge>
            </div>
          )}
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Title and Status */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-promotion-detail-title">
              {promotion.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-5 w-5" />
              <span>
                {isExpired 
                  ? `Đã hết hạn vào ${format(new Date(promotion.validUntil), "dd/MM/yyyy", { locale: vi })}`
                  : `Còn hạn đến ${format(new Date(promotion.validUntil), "dd/MM/yyyy", { locale: vi })}`
                }
              </span>
            </div>
          </div>

          {/* Promo Code Card */}
          <Card className="border-card-border bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5 text-primary" />
                Mã khuyến mãi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1 p-4 bg-background rounded-lg border-2 border-dashed border-primary/50">
                  <p className="font-mono text-2xl font-bold text-center" data-testid="text-promotion-code">
                    {promotion.code}
                  </p>
                </div>
                <Button
                  onClick={copyCode}
                  size="lg"
                  variant={copied ? "secondary" : "default"}
                  className="gap-2"
                  data-testid="button-copy-code"
                  disabled={isExpired}
                >
                  {copied ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span>Đã sao chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" />
                      <span>Sao chép</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle>Mô tả chương trình</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line" data-testid="text-promotion-description">
                {promotion.description}
              </p>
            </CardContent>
          </Card>

          {/* Terms & Conditions */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle>Điều khoản & Điều kiện</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Mã khuyến mãi chỉ áp dụng cho đặt phòng trực tuyến tại Continental Hotel</p>
              <p>• Không áp dụng đồng thời với các chương trình khuyến mãi khác</p>
              <p>• Giảm giá {promotion.discountPercentage}% trên tổng giá trị đặt phòng</p>
              <p>• Có hiệu lực đến {format(new Date(promotion.validUntil), "dd/MM/yyyy 'lúc' HH:mm", { locale: vi })}</p>
              <p>• Continental Hotel có quyền thay đổi hoặc hủy bỏ chương trình mà không cần báo trước</p>
              <p>• Mã khuyến mãi chỉ sử dụng được một lần cho mỗi tài khoản</p>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/posts" data-testid="link-browse-rooms">
              <Button size="lg" className="w-full sm:w-auto" disabled={isExpired}>
                Xem phòng để đặt
              </Button>
            </Link>
            <Link href="/promotions">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Xem khuyến mãi khác
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
