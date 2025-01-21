'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Cookies from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Local credentials for authentication
  const LOCAL_CREDENTIALS = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
    { username: "user3", password: "password3" },
    { username: "user4", password: "password4" },
    { username: "user5", password: "password5" },
    { username: "user6", password: "password6" },
    { username: "user7", password: "password7" },
    { username: "user8", password: "password8" },
    { username: "user9", password: "password9" },
    { username: "user10", password: "password10" },
    { username: "user11", password: "password11" },
    { username: "user12", password: "password12" },
    { username: "user13", password: "password13" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = LOCAL_CREDENTIALS.find(
        (cred) =>
          cred.username === formData.username &&
          cred.password === formData.password
      );

      if (user) {
        // Store authentication status in both localStorage and cookies
        localStorage.setItem('isAuthenticated', 'true');
        Cookies.set('isAuthenticated', 'true', { expires: 1 }); // Cookie valid for 1 day
        toast.success('Login successful');
        router.push('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/placeholder.svg"
              alt="Logo"
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>
          <CardTitle className="text-2xl">LEAP ACADEMY</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">VERSION 8.0</p>
          <p className="text-sm text-muted-foreground">BUREWALA</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                required
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
