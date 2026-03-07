'use client';

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-primary">
              <ShoppingBag className="h-5 w-5" />
              Wild<span className="text-accent">Kits</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              CIT-U's campus marketplace for buying, selling, and lending among students.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Marketplace</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Browse Items</Link></li>
              <li><Link href="/list-item" className="hover:text-primary transition-colors">List an Item</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Account</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/profile" className="hover:text-primary transition-colors">Profile</Link></li>
              <li><Link href="/transactions" className="hover:text-primary transition-colors">Transactions</Link></li>
              <li><Link href="/messages" className="hover:text-primary transition-colors">Messages</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Safety Tips</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          © 2026 WildKits — Cebu Institute of Technology – University. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
