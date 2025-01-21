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
    { username: "alpha_user", password: "alphaPass123" },
    { username: "beta_user", password: "betaSecure456" },
    { username: "gamma_user", password: "gammaCode789" },
    { username: "delta_user", password: "deltaPass321" },
    { username: "epsilon_user", password: "epsilonKey654" },
    { username: "zeta_user", password: "zetaSafe987" },
    { username: "eta_user", password: "etaStrong111" },
    { username: "theta_user", password: "thetaVault222" },
    { username: "iota_user", password: "iotaSecure333" },
    { username: "kappa_user", password: "kappaCode444" },
    { username: "lambda_user", password: "lambdaPass555" },
    { username: "mu_user", password: "muKey666" },
    { username: "nu_user", password: "nuSafe777" },
    { username: "developer", password: "ahmad" }
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
