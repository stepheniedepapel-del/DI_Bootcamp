import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — StoryWeave" },
      { name: "description", content: "Reset your StoryWeave password." },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [phase, setPhase] = useState<"request" | "confirm">("request");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setPhase("confirm");
    }
  }, []);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage("Check your email for the reset link.");
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) {
      setError(updateError.message);
    } else {
      setMessage("Password updated! You can now sign in.");
      setTimeout(() => {
        window.location.href = "/auth";
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            {phase === "request" ? "Reset password" : "Set new password"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {phase === "request"
              ? "We'll send you a link to reset your password."
              : "Enter your new password below."}
          </p>
        </div>

        <form onSubmit={phase === "request" ? handleRequest : handleConfirm} className="space-y-4">
          {phase === "request" ? (
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
              {message}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? phase === "request"
                ? "Sending..."
                : "Updating..."
              : phase === "request"
                ? "Send reset link"
                : "Update password"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
