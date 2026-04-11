"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, ImagePlus, Tag, DollarSign, Info } from "lucide-react";
import { motion } from "framer-motion";
import { productsAPI } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

type ListingType = "sell" | "lend";

const DEFAULT_IMAGE_PLACEHOLDER = "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=600&fit=crop";

export default function ListItem() {
  const [listingType, setListingType] = useState<ListingType>("sell");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [allowNegotiation, setAllowNegotiation] = useState(true);
  const [maxDays, setMaxDays] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "lend") {
      setListingType("lend");
    } else {
      setListingType("sell");
    }
  }, [searchParams]);

  const canSubmit = useMemo(() => {
    const numericPrice = Number(price);
    return (
      title.trim().length >= 3 &&
      description.trim().length >= 10 &&
      category.trim().length > 0 &&
      condition.trim().length > 0 &&
      Number.isFinite(numericPrice) &&
      numericPrice > 0 &&
      isAuthenticated
    );
  }, [title, description, category, condition, price, isAuthenticated]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be 5MB or below.",
        variant: "destructive",
      });
      return;
    }

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user?.userId) {
      toast({
        title: "Login required",
        description: "Please log in before creating a listing.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    if (!canSubmit) {
      toast({
        title: "Incomplete form",
        description: "Please complete the required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        type: listingType === "sell" ? ("SELL" as const) : ("LEND" as const),
        category: category.trim(),
        condition: condition.trim(),
        userId: user.userId,
      };

      await productsAPI.createWithImage(payload, selectedImage ?? undefined);

      toast({
        title: "Listing published",
        description: "Your item is now live in the marketplace.",
      });

      router.push("/marketplace");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to publish listing.";
      toast({
        title: "Publish failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-2xl py-8">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-1 font-display text-2xl font-bold text-foreground">List an Item</h1>
          <p className="mb-6 text-sm text-muted-foreground">Fill in the details to list your item on WildKits.</p>

          <Card className="p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Listing Type Toggle */}
              <div className="flex items-center gap-4 rounded-lg border border-border p-3">
                <button
                  type="button"
                  onClick={() => setListingType("sell")}
                  className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                    listingType === "sell" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sell
                </button>
                <button
                  type="button"
                  onClick={() => setListingType("lend")}
                  className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                    listingType === "lend" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Lend / Rent
                </button>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Photos</Label>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  <label className="relative flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/50 transition-colors hover:border-primary/50">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Selected listing preview" className="h-full w-full object-cover" />
                    ) : (
                      <>
                        <ImagePlus className="mb-1 h-6 w-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Add Photo</span>
                      </>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                  <div className="flex aspect-square cursor-default flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex aspect-square cursor-default flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Item Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Engineering Mathematics Textbook"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item, condition, and any relevant details..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="textbooks">Textbooks</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="uniforms">Uniforms</SelectItem>
                      <SelectItem value="lab">Lab Equipment</SelectItem>
                      <SelectItem value="art">Art Supplies</SelectItem>
                      <SelectItem value="gadgets">Gadgets</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">
                  {listingType === "sell" ? "Price (₱)" : "Rental Rate (₱/day)"}
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    className="pl-10"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              {listingType === "lend" && (
                <div className="space-y-2">
                  <Label htmlFor="maxDays">Maximum Rental Days</Label>
                  <Input
                    id="maxDays"
                    type="number"
                    placeholder="e.g. 7"
                    value={maxDays}
                    onChange={(e) => setMaxDays(e.target.value)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Allow negotiations</span>
                </div>
                <Switch checked={allowNegotiation} onCheckedChange={setAllowNegotiation} />
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1" size="lg" disabled={!canSubmit || submitting}>
                  {submitting ? "Publishing..." : "Publish Listing"}
                </Button>
                <Button type="button" variant="outline" size="lg">
                  Save Draft
                </Button>
              </div>

              {!previewUrl && (
                <img src={DEFAULT_IMAGE_PLACEHOLDER} alt="Listing placeholder" className="hidden" />
              )}
            </form>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
