import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Camera, Mail, Phone, MapPin, GraduationCap, Shield, Bell, Edit3, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Layout>
      <div className="container max-w-3xl py-8">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          {/* Profile Header */}
          <Card className="mb-6 p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                    {user?.name ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm">
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="font-display text-xl font-bold text-foreground">{user?.name || 'User'}</h1>
                <p className="text-sm text-muted-foreground">
                  @{user?.name?.toLowerCase().replace(/\s+/g, '') || 'user'} · Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                  {user?.accountStatus === 'APPROVED' && (
                    <Badge className="bg-green-100 text-green-700 gap-1"><Shield className="h-3 w-3" /> Verified</Badge>
                  )}
                  {user?.accountStatus === 'PENDING' && (
                    <Badge className="bg-yellow-100 text-yellow-700 gap-1"><Clock className="h-3 w-3" /> Pending Verification</Badge>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-1"><Edit3 className="h-3 w-3" /> Edit</Button>
            </div>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="personal">
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card className="p-6">
                <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Personal Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input defaultValue={user?.name?.split(' ')[0] || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input defaultValue={user?.name?.split(' ').slice(1).join(' ') || ''} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input defaultValue={user?.email || ''} className="pl-10" readOnly />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Add your phone number" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Campus Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Add your campus location" className="pl-10" />
                    </div>
                  </div>
                  <Button className="mt-2">Save Changes</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="p-6">
                <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { label: "New messages", desc: "Get notified when someone sends you a message" },
                    { label: "Transaction updates", desc: "Updates on your buy/sell/lend transactions" },
                    { label: "Price drops", desc: "When items in your watchlist drop in price" },
                    { label: "Promotional emails", desc: "WildKits news and featured items" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="p-6">
                <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Security Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <Button>Update Password</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </Layout>
  );
}
