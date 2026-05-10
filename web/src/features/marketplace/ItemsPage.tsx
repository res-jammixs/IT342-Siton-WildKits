import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Package,
  Search,
  Filter,
  Plus,
  ShoppingBag,
  HandCoins,
  LayoutGrid,
  ArrowUpRight,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductCard } from "@/components/ProductCard";
import { ProductResponse, productsAPI } from "@/lib/api";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop";

export default function Items() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        if (mounted) {
          setProducts(response);
        }
      } catch (error) {
        console.error("Failed to load items", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const itemStats = useMemo(() => {
    const total = products.length;
    const forSale = products.filter((product) => product.type === "SELL").length;
    const forLend = products.filter((product) => product.type === "LEND").length;
    const categories = new Set(products.map((product) => (product.category || "").toLowerCase()).filter(Boolean)).size;

    return [
      { label: "Total Items", value: String(total), icon: Package, helper: "Live listings" },
      { label: "For Sale", value: String(forSale), icon: ShoppingBag, helper: "Buy now posts" },
      { label: "For Lend", value: String(forLend), icon: HandCoins, helper: "Borrow listings" },
      { label: "Categories", value: String(categories), icon: LayoutGrid, helper: "Active segments" },
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        (product.category || "").toLowerCase() === selectedCategory.toLowerCase();

      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        normalizedQuery.length === 0 ||
        product.title.toLowerCase().includes(normalizedQuery) ||
        (product.description || "").toLowerCase().includes(normalizedQuery) ||
        (product.category || "").toLowerCase().includes(normalizedQuery) ||
        (product.userName || "").toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Items Marketplace</h1>
            <p className="text-sm text-muted-foreground">Browse all listings posted by students across campus.</p>
          </div>
          <Button className="gap-2" asChild>
            <Link href="/list-item?tab=sell">
              <Plus className="h-4 w-4" />
              Post New Item
            </Link>
          </Button>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {itemStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-3 font-display text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-xs text-primary">{stat.helper}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-5">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-display text-lg font-semibold text-foreground">All Available Items</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => setSearchQuery("") }>
                    <RefreshCw className="h-4 w-4" /> Reset
                  </Button>
                </div>
              </div>

              <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search title, seller, or category"
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </Button>
              </div>

              <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {loading ? (
                  <p className="col-span-full text-sm text-muted-foreground">Loading items...</p>
                ) : filteredProducts.length === 0 ? (
                  <div className="col-span-full rounded-lg border border-border p-8 text-center">
                    <p className="text-sm font-medium text-foreground">No matching items found</p>
                    <p className="mt-1 text-xs text-muted-foreground">Try another search or category.</p>
                  </div>
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
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-5">
              <h3 className="mb-3 font-display text-sm font-semibold text-foreground">Marketplace Notes</h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>All listings are submitted by verified users in WildKits.</p>
                <p>Use chat to confirm item condition and meetup details before transactions.</p>
                <p>Report suspicious posts through the support channels.</p>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="mb-3 font-display text-sm font-semibold text-foreground">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2 text-sm" size="sm" asChild>
                  <Link href="/list-item?tab=sell">
                    <Plus className="h-4 w-4" /> Post an Item
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-sm" size="sm" asChild>
                  <Link href="/messages">
                    <MessageSquare className="h-4 w-4" /> Open Messages
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
