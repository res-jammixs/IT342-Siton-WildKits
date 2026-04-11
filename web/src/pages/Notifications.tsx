import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bell, ShoppingBag, MessageSquare, CheckCircle2, AlertTriangle, Info, Trash2, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

const notifications: Array<{
  id: string;
  type: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  time: string;
  read: boolean;
}> = [];

const typeStyles: Record<string, string> = {
  order: "bg-primary/10 text-primary",
  message: "bg-blue-100 text-blue-600",
  success: "bg-green-100 text-green-600",
  warning: "bg-accent/20 text-yellow-dark",
  info: "bg-secondary text-secondary-foreground",
};

export default function Notifications() {
  return (
    <Layout>
      <div className="container max-w-2xl py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-sm text-muted-foreground">Stay updated on your marketplace activity.</p>
          </div>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" className="text-primary">Mark all read</Button>
          )}
        </div>

        <div className="space-y-2">
          {notifications.length > 0 ? (
            notifications.map((notif, i) => (
              <motion.div key={notif.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className={`flex items-start gap-3 p-4 transition-colors ${!notif.read ? "border-l-4 border-l-primary bg-secondary/50" : ""}`}>
                  <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${typeStyles[notif.type]}`}>
                    <notif.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${!notif.read ? "font-semibold" : "font-medium"} text-foreground`}>{notif.title}</p>
                      <span className="shrink-0 text-xs text-muted-foreground">{notif.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{notif.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card className="p-12">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                  <Bell className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">No notifications yet</h3>
                <p className="text-sm text-muted-foreground">You'll be notified about important marketplace activities here.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
