import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, UserPlus } from "lucide-react";

/**
 * Admin Registration Page
 * Allows admins to create new user accounts with email/password
 */
export default function AdminRegister() {
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const registerMutation = trpc.emailAuth.register.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setError("");
      // Reset form
      setEmail("");
      setPassword("");
      setName("");
      setRole("user");
    },
    onError: (err) => {
      setError(err.message);
      setSuccess(false);
    },
  });

  // Check if user is admin
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Access denied. This page is only available to administrators.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email || !password || !name) {
      setError("Please fill in all fields");
      return;
    }

    registerMutation.mutate({ email, password, name, role });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => setLocation("/perfil")} className="mb-4">
            ← Back to Profile
          </Button>
          <h1 className="text-3xl font-bold">Create New Account</h1>
          <p className="text-gray-600 mt-2">Register a new user with email/password authentication</p>
        </div>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>
              Create a new account for administrators or federation partners
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={registerMutation.isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={registerMutation.isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={registerMutation.isPending}
                />
                <p className="text-sm text-gray-500">
                  Must be at least 8 characters with uppercase, lowercase, and numbers
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value: "user" | "admin") => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User (Federation/Club)</SelectItem>
                    <SelectItem value="admin">Admin (Full Access)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Account created successfully! The user can now log in at /login
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={registerMutation.isPending}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                {registerMutation.isPending ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Requirements */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Password Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ At least 8 characters long</li>
              <li>✓ Contains at least one uppercase letter (A-Z)</li>
              <li>✓ Contains at least one lowercase letter (a-z)</li>
              <li>✓ Contains at least one number (0-9)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
