import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { SigninForm } from "./signin-form";

export default function SignUpOverlay({ onSuccess, onClose, onSwitch }) {
  return (
    <div className="w-full max-w-md space-y-8">
      {/* Signin Form Card */}
      <div>
        <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-background/95 via-background to-background/95 backdrop-blur-xl">
          {/* Custom Border Animation */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse"></div>
          <div className="absolute inset-[1px] rounded-lg bg-background"></div>
          <div className="relative z-10">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                <LogIn className="h-5 w-5 text-primary" />
                Sign In
              </CardTitle>
              <CardDescription className="text-base">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <SigninForm onSuccess={onSuccess} showSignupLink={false} />

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={onSwitch}
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </button>
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
