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
import { Search, ArrowRight } from "lucide-react";
import type { Post } from "@shared/schema";

export default function Posts() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [searchTag, setSearchTag] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Chưa đăng nhập",
        description: "Bạn cần đăng nhập để xem bài đăng...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, toast]);

  const queryUrl = searchTag ? `/api/posts?tag=${encodeURIComponent(searchTag)}` : "/api/posts";
  
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts", searchTag],
    queryFn: () => fetch(queryUrl).then(r => {
      if (!r.ok) throw new Error("Failed to fetch posts");
      return r.json();
    }),
    enabled: isAuthenticated,
  });

  const filteredPosts = posts || [];

  if (authLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Header Section */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-posts-title">
            Bài đăng phòng khách sạn
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Khám phá các phòng sang trọng của Continental Hotel
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
                placeholder="Tìm kiếm theo tag (vd: deluxe, suite, ocean view...)"
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                className="pl-10"
                data-testid="input-search-tag"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden border-card-border">
                <Skeleton className="aspect-[4/3] w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4" data-testid="text-no-posts">
              {searchTag ? "Không tìm thấy bài đăng nào với tag này" : "Chưa có bài đăng nào"}
            </p>
            {searchTag && (
              <Button onClick={() => setSearchTag("")} variant="outline">
                Xóa bộ lọc
              </Button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card 
                key={post.id} 
                className="overflow-hidden hover-elevate border-card-border"
                data-testid={`card-post-${post.id}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2" data-testid={`text-post-title-${post.id}`}>
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{post.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    ${post.price}
                    <span className="text-sm font-normal text-muted-foreground">/đêm</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/posts/${post.id}`} data-testid={`link-post-detail-${post.id}`}>
                    <Button className="w-full gap-2">
                      <span>Xem chi tiết</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
