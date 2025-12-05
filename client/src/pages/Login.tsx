import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { AlertCircle, Mail, Lock, LogIn } from "lucide-react";

/**
 * Email/Password Login Page
 * Secure backup authentication independent of Manus OAuth
 */
export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const utils = trpc.useUtils();

  const loginMutation = trpc.emailAuth.login.useMutation({
    onSuccess: async () => {
      // Invalidate auth query to refresh user state
      await utils.auth.me.invalidate();
      // Wait a bit for the refetch to complete
      await new Promise(resolve => setTimeout(resolve, 200));
      // Redirect to profile page
      setLocation("/perfil");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            {APP_LOGO && (
              <img src={APP_LOGO} alt={APP_TITLE} className="h-12 w-12 object-contain" />
            )}
            <CardTitle className="text-2xl">{APP_TITLE}</CardTitle>
          </div>
          <CardDescription className="text-center">
            Sign in to access your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email/Password Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={loginMutation.isPending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={loginMutation.isPending}
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              <LogIn className="mr-2 h-4 w-4" />
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Manus OAuth Login */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.location.href = getLoginUrl()}
          >
            Continue with Manus OAuth
          </Button>

          {/* Back to Home */}
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setLocation("/")}
              className="text-sm text-gray-600"
            >
              ← Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
