import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Users, Bed } from "lucide-react";
import type { Post } from "@shared/schema";

export default function PostDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();


  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ["/api/posts", id],
    queryFn: () => fetch(`/api/posts/${id}`).then(r => {
      if (!r.ok) throw new Error("Failed to fetch post");
      return r.json();
    }),
    enabled: isAuthenticated && !!id,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen pb-12">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
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
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Không tìm thấy bài đăng</p>
          <Link href="/posts">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Back Button */}
        <Link href="/posts" data-testid="link-back-to-posts">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại danh sách</span>
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="h-full w-full object-cover"
                data-testid="img-post-detail"
              />
            </div>

            {/* Title and Tags */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-post-detail-title">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" data-testid={`badge-tag-${idx}`}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description */}
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Mô tả chi tiết</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line" data-testid="text-post-description">
                  {post.description}
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Tiện nghi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Bed className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Giường King</p>
                      <p className="text-sm text-muted-foreground">Cao cấp</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">2-3 khách</p>
                      <p className="text-sm text-muted-foreground">Tối đa</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Linh hoạt</p>
                      <p className="text-sm text-muted-foreground">Hủy miễn phí</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-card-border sticky top-24">
              <CardHeader>
                <CardTitle>Thông tin đặt phòng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-3xl font-bold text-primary">
                    ${post.price}
                    <span className="text-base font-normal text-muted-foreground">/đêm</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Giá chưa bao gồm thuế và phí
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Giá phòng (1 đêm)</span>
                    <span className="font-medium">${post.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phí dịch vụ</span>
                    <span className="font-medium">${(post.price * 0.1).toFixed(0)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Tổng cộng</span>
                    <span className="text-primary">${(post.price * 1.1).toFixed(0)}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" data-testid="button-book-now">
                  Đặt phòng ngay
                </Button>

                <div className="text-center">
                  <Link href="/promotions" data-testid="link-view-promotions">
                    <Button variant="link" className="text-primary">
                      Xem mã khuyến mãi
                    </Button>
                  </Link>
                </div>

                <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                  <p>✓ Miễn phí hủy phòng trong 24h</p>
                  <p>✓ Xác nhận đặt phòng ngay lập tức</p>
                  <p>✓ Hỗ trợ 24/7</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
