import { useQuery } from "@tanstack/react-query";
import { Blog } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export const BlogSection = () => {
  const { data: blogs = [], isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/admin/blogs"],
  });

  const publishedBlogs = blogs.filter(blog => blog.status === "published");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (publishedBlogs.length === 0) {
    return null; // Don't show the section if no published blogs
  }

  return (
    <div className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Latest Insights</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our latest articles on career guidance, educational planning, and mental well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col hover-elevate overflow-hidden border-border/50">
                {blog.coverImageUrl && (
                  <div className="h-48 w-full overflow-hidden">
                    <img 
                      src={blog.coverImageUrl} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="w-3 h-3" />
                    {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "Recent"}
                  </div>
                  <CardTitle className="line-clamp-2 text-xl leading-tight hover:text-primary transition-colors cursor-pointer">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {blog.summary || "Click read more to see the full article and gain valuable insights for your career journey."}
                  </p>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="p-0 text-primary hover:text-primary/80 hover:bg-transparent group">
                        Read More <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight mb-4">
                          {blog.title}
                        </DialogTitle>
                        {blog.coverImageUrl && (
                          <img 
                            src={blog.coverImageUrl} 
                            alt={blog.title} 
                            className="w-full h-64 object-cover rounded-lg mb-6" 
                          />
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "Recent"}</span>
                          <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> 5 min read</span>
                        </div>
                      </DialogHeader>
                      <div 
                        className="prose prose-purple dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.body }}
                      />
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
