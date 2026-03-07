"use client";

import { Heart, MessageSquare, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  seller: string;
  type: "sell" | "lend";
  condition?: string;
}

export function ProductCard({ id, title, price, image, category, seller, type, condition }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute left-2 top-2 flex gap-1.5">
          <Badge variant={type === "sell" ? "default" : "secondary"} className={type === "lend" ? "bg-accent text-accent-foreground" : ""}>
            {type === "sell" ? "For Sale" : "For Rent"}
          </Badge>
          {condition && (
            <Badge variant="outline" className="bg-card/80 backdrop-blur-sm text-xs">
              {condition}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-3">
        <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Tag className="h-3 w-3" />
          {category}
        </div>
        <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-foreground">{title}</h3>
        <div className="flex items-center justify-between">
          <p className="font-display text-lg font-bold text-primary">
            ₱{price.toLocaleString()}
            {type === "lend" && <span className="text-xs font-normal text-muted-foreground">/day</span>}
          </p>
          <span className="text-xs text-muted-foreground">by {seller}</span>
        </div>
        <div className="mt-3 flex gap-2">
          <Button size="sm" className="flex-1 text-xs" asChild>
            <Link href={`/item/${id}`}>
              {type === "sell" ? "Buy Now" : "Borrow"}
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <MessageSquare className="mr-1 h-3 w-3" /> Chat
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
