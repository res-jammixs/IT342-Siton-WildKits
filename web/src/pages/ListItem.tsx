import { useState } from "react";
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

export default function ListItem() {
  const [listingType, setListingType] = useState<"sell" | "lend">("sell");

  return (
    <Layout>
      <div className="container max-w-2xl py-8">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-1 font-display text-2xl font-bold text-foreground">List an Item</h1>
          <p className="mb-6 text-sm text-muted-foreground">Fill in the details to list your item on WildKits.</p>

          <Card className="p-6">
            <form className="space-y-6">
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
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 transition-colors hover:border-primary/50">
                    <ImagePlus className="mb-1 h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Add Photo</span>
                  </div>
                  <div className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 transition-colors hover:border-primary/50">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 transition-colors hover:border-primary/50">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Item Title</Label>
                <Input id="title" placeholder="e.g. Engineering Mathematics Textbook" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your item, condition, and any relevant details..." rows={4} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
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
                  <Select>
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
                  <Input id="price" type="number" placeholder="0.00" className="pl-10" />
                </div>
              </div>

              {listingType === "lend" && (
                <div className="space-y-2">
                  <Label htmlFor="maxDays">Maximum Rental Days</Label>
                  <Input id="maxDays" type="number" placeholder="e.g. 7" />
                </div>
              )}

              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Allow negotiations</span>
                </div>
                <Switch />
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1" size="lg">
                  Publish Listing
                </Button>
                <Button type="button" variant="outline" size="lg">
                  Save Draft
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
