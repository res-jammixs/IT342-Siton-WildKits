import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ShoppingBag, TrendingUp, Eye, MessageSquare, Package, Clock, CheckCircle2, AlertCircle, Plus, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const stats = [
  { label: "Active Listings", value: "0", icon: Package, change: "No listings yet" },
  { label: "Total Views", value: "0", icon: Eye, change: "0%" },
  { label: "Messages", value: "0", icon: MessageSquare, change: "No messages" },
  { label: "Revenue", value: "₱0", icon: TrendingUp, change: "₱0" },
];

const recentOrders: Array<{ id: string; item: string; buyer: string; status: string; amount: number }> = [];

const statusStyles: Record<string, string> = {
  completed: "bg-green-100 text-green-700",
  active: "bg-accent/20 text-yellow-dark",
  pending: "bg-secondary text-secondary-foreground",
};

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Protect route - redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <Layout>
        <div className="container flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-sm text-muted-foreground">Here's your marketplace overview.</p>
          </div>
          <Button className="gap-2" asChild>
            <Link href="/list-item?tab=sell"><Plus className="h-4 w-4" /> List New Item</Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-3 font-display text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-xs text-primary">{stat.change}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-foreground">Recent Transactions</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/transactions">View All</Link>
                </Button>
              </div>
              <div className="space-y-3">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{order.item}</p>
                          <p className="text-xs text-muted-foreground">{order.buyer} · {order.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">₱{order.amount}</p>
                        <Badge variant="secondary" className={`text-xs ${statusStyles[order.status]}`}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                      <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium text-foreground">No transactions yet</p>
                    <p className="mt-1 text-xs text-muted-foreground">Your recent transactions will appear here</p>
                    <Button className="mt-4 gap-2" size="sm" asChild>
                      <Link href="/list-item?tab=sell"><Plus className="h-4 w-4" /> List Your First Item</Link>
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-4">
            <Card className="p-5">
              <h3 className="mb-3 font-display text-sm font-semibold text-foreground">Account Status</h3>
              <div className={`flex items-center gap-2 rounded-lg p-3 ${
                user.accountStatus === 'APPROVED' 
                  ? 'bg-green-50' 
                  : user.accountStatus === 'PENDING'
                  ? 'bg-yellow-50'
                  : 'bg-red-50'
              }`}>
                {user.accountStatus === 'APPROVED' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : user.accountStatus === 'PENDING' ? (
                  <Clock className="h-5 w-5 text-yellow-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <div>
                  <p className={`text-sm font-medium ${
                    user.accountStatus === 'APPROVED' 
                      ? 'text-green-800' 
                      : user.accountStatus === 'PENDING'
                      ? 'text-yellow-800'
                      : 'text-red-800'
                  }`}>
                    {user.accountStatus === 'APPROVED' 
                      ? 'Verified Student' 
                      : user.accountStatus === 'PENDING'
                      ? 'Pending Approval'
                      : 'Not Verified'}
                  </p>
                  <p className={`text-xs ${
                    user.accountStatus === 'APPROVED' 
                      ? 'text-green-600' 
                      : user.accountStatus === 'PENDING'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}>
                    {user.email}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="mb-3 font-display text-sm font-semibold text-foreground">Seller Rating</h3>
              <div className="flex items-center gap-1 text-muted-foreground">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
                <span className="ml-1 text-sm font-semibold text-foreground">0.0</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">No reviews yet</p>
            </Card>

            <Card className="p-5">
              <h3 className="mb-3 font-display text-sm font-semibold text-foreground">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2 text-sm" size="sm" asChild>
                  <Link href="/list-item?tab=sell"><Plus className="h-4 w-4" /> List New Item</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-sm" size="sm" asChild>
                  <Link href="/messages"><MessageSquare className="h-4 w-4" /> View Messages</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-sm" size="sm" asChild>
                  <Link href="/profile"><AlertCircle className="h-4 w-4" /> Update Profile</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
