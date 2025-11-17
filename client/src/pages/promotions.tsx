import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ArrowRight, Clock, Percent } from "lucide-react";
import type { Promotion } from "@shared/schema";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function Promotions() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [searchCode, setSearchCode] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Chưa đăng nhập",
        description: "Bạn cần đăng nhập để xem khuyến mãi...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, toast]);

  const queryUrl = searchCode ? `/api/promotions?code=${encodeURIComponent(searchCode)}` : "/api/promotions";
  
  const { data: promotions, isLoading } = useQuery<Promotion[]>({
    queryKey: ["/api/promotions", searchCode],
    queryFn: () => fetch(queryUrl).then(r => {
      if (!r.ok) throw new Error("Failed to fetch promotions");
      return r.json();
    }),
    enabled: isAuthenticated,
  });

  const filteredPromotions = promotions || [];

  if (authLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Header Section */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-promotions-title">
            Khuyến mãi đặc biệt
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Tiết kiệm chi phí với các ưu đãi hấp dẫn từ Continental Hotel
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm theo mã khuyến mãi (vd: SUMMER2024...)"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="pl-10"
                data-testid="input-search-code"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden border-card-border">
                <div className="grid md:grid-cols-2">
                  <Skeleton className="aspect-video md:aspect-square w-full" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : filteredPromotions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4" data-testid="text-no-promotions">
              {searchCode ? "Không tìm thấy khuyến mãi nào với mã này" : "Chưa có khuyến mãi nào"}
            </p>
            {searchCode && (
              <Button onClick={() => setSearchCode("")} variant="outline">
                Xóa bộ lọc
              </Button>
            )}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredPromotions.map((promo) => {
              const isExpired = new Date(promo.validUntil) < new Date();
              return (
                <Card 
                  key={promo.id} 
                  className="overflow-hidden hover-elevate border-card-border"
                  data-testid={`card-promotion-${promo.id}`}
                >
                  <div className="grid md:grid-cols-2">
                    <div className="aspect-video md:aspect-square overflow-hidden relative">
                      <img
                        src={promo.imageUrl}
                        alt={promo.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="text-lg font-bold bg-primary/90 backdrop-blur-sm">
                          -{promo.discountPercentage}%
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="line-clamp-2" data-testid={`text-promotion-title-${promo.id}`}>
                          {promo.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 mb-4 flex-1">
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {promo.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="p-1.5 rounded bg-primary/10">
                              <Percent className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span className="font-mono font-semibold" data-testid={`text-promo-code-${promo.id}`}>
                              {promo.code}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="p-1.5 rounded bg-muted">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                            <span className={isExpired ? "text-destructive" : "text-muted-foreground"}>
                              {isExpired ? "Đã hết hạn" : `Còn hạn đến ${format(new Date(promo.validUntil), "dd/MM/yyyy", { locale: vi })}`}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-0">
                        <Link href={`/promotions/${promo.id}`} data-testid={`link-promotion-detail-${promo.id}`}>
                          <Button className="w-full gap-2" disabled={isExpired}>
                            <span>Xem chi tiết</span>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
