import { useState } from "react";
import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@ui/lib/utils";
import { Button } from "@ui/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  // FieldSeparator,
} from "@ui/components/ui/field";
import { Input } from "@ui/components/ui/input";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:39402/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountName, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            {/* <a */}
            {/*   href="/" */}
            {/*   className="flex flex-col items-center gap-2 font-medium" */}
            {/* > */}
            {/*   <div className="flex size-8 items-center justify-center rounded-md"> */}
            {/*     <GalleryVerticalEnd className="size-6" /> */}
            {/*   </div> */}
            {/*   <span className="sr-only">Nexus Archive</span> */}
            {/* </a> */}
            <h1 className="text-4xl font-bold">Nexus Archive</h1>
            <FieldDescription>
              Already have an account? <a href="/login">Log in</a>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="accountName">
              Name
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="accountName"
              type="text"
              placeholder="Enter your display name"
              required
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </Field>
          <Field className="-mt-4">
            <FieldLabel htmlFor="password">
              Password
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Field>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </Field>
          {error && <p className="text-destructive">{error}</p>}
          {success && (
            <p className="text-green-500">
              Account created successfully! You can now log in.
            </p>
          )}
        </FieldGroup>
      </form>
    </div>
  );
}