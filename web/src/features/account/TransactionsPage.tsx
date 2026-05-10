import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, XCircle, Plus } from "lucide-react";
import Link from "next/link";

const transactions: Array<{
  id: string;
  item: string;
  with: string;
  type: string;
  amount: number;
  date: string;
  status: string;
}> = [];

const statusIcons: Record<string, React.ReactNode> = {
  completed: <CheckCircle2 className="h-4 w-4 text-green-600" />,
  active: <Clock className="h-4 w-4 text-yellow-dark" />,
  returned: <CheckCircle2 className="h-4 w-4 text-blue-600" />,
  cancelled: <XCircle className="h-4 w-4 text-destructive" />,
};

export default function Transactions() {
  return (
    <Layout>
      <div className="container max-w-3xl py-8">
        <h1 className="mb-1 font-display text-2xl font-bold text-foreground">Transaction History</h1>
        <p className="mb-6 text-sm text-muted-foreground">Track all your marketplace activities.</p>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="rentals">Rentals</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {transactions.length > 0 ? (
              transactions.map((txn, i) => (
                <motion.div key={txn.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        txn.type === "sold" || txn.type === "lent" ? "bg-green-50" : "bg-secondary"
                      }`}>
                        {txn.type === "sold" || txn.type === "lent" ? (
                          <ArrowUpRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDownLeft className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{txn.item}</p>
                        <p className="text-xs text-muted-foreground">
                          {txn.type === "sold" || txn.type === "lent" ? "To" : "From"} {txn.with} · {txn.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${
                          txn.type === "sold" || txn.type === "lent" ? "text-green-600" : "text-foreground"
                        }`}>
                          {txn.type === "sold" || txn.type === "lent" ? "+" : "-"}₱{txn.amount}
                        </p>
                        <Badge variant="outline" className="text-xs capitalize">{txn.type}</Badge>
                      </div>
                      {statusIcons[txn.status]}
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="p-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                    <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">No transactions yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Your transaction history will appear here once you buy, sell, or lend items.</p>
                  <Button className="gap-2" asChild>
                    <Link href="/list-item?tab=sell"><Plus className="h-4 w-4" /> List Your First Item</Link>
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="sales"><p className="py-8 text-center text-sm text-muted-foreground">Filter by sales transactions.</p></TabsContent>
          <TabsContent value="purchases"><p className="py-8 text-center text-sm text-muted-foreground">Filter by purchase transactions.</p></TabsContent>
          <TabsContent value="rentals"><p className="py-8 text-center text-sm text-muted-foreground">Filter by rental transactions.</p></TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
