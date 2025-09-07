import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap } from "lucide-react";
import { SignupForm } from "./signup-form";

export default function SignUpOverlay({ onSuccess, onClose, onSwitch }) {
  return (
    <div>
      <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-background/95 via-background to-background/95 backdrop-blur-xl">
        {/* Custom Border Animation */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse"></div>
        <div className="absolute inset-[1px] rounded-lg bg-background"></div>

        <div className="relative z-10">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Create Account
            </CardTitle>
            <CardDescription className="text-base">
              Join thousands of users in our amazing platform
            </CardDescription>
          </CardHeader>

          <CardContent>
            <SignupForm onSuccess={onSuccess} showSignupLink={false}/>

            <p className="text-center text-sm text-muted-foreground">
                have an account?{" "}
                <button
                  onClick={onSwitch}
                  className="text-primary font-medium hover:underline"
                >
                  Sign in
                </button>
              </p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
