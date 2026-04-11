import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, ArrowRight, BookOpen, Laptop, Shirt, FlaskConical, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductResponse, productsAPI } from "@/lib/api";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop";

const quickCategories = [
  { icon: BookOpen, label: "Textbooks", count: 234 },
  { icon: Laptop, label: "Electronics", count: 156 },
  { icon: Shirt, label: "Uniforms", count: 89 },
  { icon: FlaskConical, label: "Lab Gear", count: 67 },
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        if (isMounted) {
          setProducts(response);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        if (isMounted) {
          setLoadingProducts(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }
    return products.filter((product) => product.category?.toLowerCase() === selectedCategory.toLowerCase());
  }, [products, selectedCategory]);

  return (
    <Layout>
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium text-primary-foreground">
              <Star className="h-3 w-3 text-accent" />
              Exclusive to CIT-U Students
            </div>
            <h1 className="mb-4 font-display text-4xl font-bold leading-tight text-primary-foreground md:text-5xl">
              Buy, Sell & Lend
              <br />
              <span className="text-accent">Within Campus</span>
            </h1>
            <p className="mb-8 text-sm text-primary-foreground/70 md:text-base">
              Your trusted peer-to-peer marketplace. Trade textbooks, electronics, uniforms, and more with fellow Wildcats.
            </p>
            <div className="mx-auto flex max-w-md gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search for items..." className="h-12 rounded-xl pl-10 text-sm" />
              </div>
              <Button variant="accent" size="lg" className="h-12 rounded-xl px-6">
                Search
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="-mt-8 pb-8">
        <div className="container">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {quickCategories.map((cat, i) => (
              <motion.button
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <cat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">{cat.count} items</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground">Trending on Campus</h2>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {loadingProducts ? (
              <p className="col-span-full text-sm text-muted-foreground">Loading listings...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="col-span-full text-sm text-muted-foreground">No items found yet. Be the first to post one.</p>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.productId}
                  id={String(product.productId)}
                  title={product.title}
                  price={Number(product.price)}
                  image={product.imageUrl || FALLBACK_IMAGE}
                  category={product.category || "Other"}
                  seller={product.userName || "Unknown seller"}
                  type={product.type === "LEND" ? "lend" : "sell"}
                  condition={product.condition}
                />
              ))
            )}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline-primary" size="lg" className="gap-2">
              Browse All Items <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="overflow-hidden rounded-2xl bg-gradient-hero p-8 md:p-12">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="mb-3 font-display text-2xl font-bold text-primary-foreground md:text-3xl">
                Got items to sell or lend?
              </h2>
              <p className="mb-6 text-sm text-primary-foreground/70">
                List your items in seconds and reach thousands of CIT-U students.
              </p>
              <Button variant="accent" size="lg" className="gap-2" asChild>
                <Link href="/list-item?tab=sell">
                  Start Listing <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
