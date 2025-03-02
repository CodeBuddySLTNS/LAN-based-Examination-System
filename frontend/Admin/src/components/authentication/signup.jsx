import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "../ui/select";

export default function Page({ setForm }) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-center text-2xl">
                Create Account
              </CardTitle>
              <CardDescription>
                Fill out the fields below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="grid gap-3">
                      <Label htmlFor="lastname">Last Name</Label>
                      <Input id="lastname" type="text" required />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="firstname">First Name</Label>
                      <Input id="firstname" type="text" required />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="middlename">Middle Name</Label>
                      <Input id="middlename" type="text" required />
                    </div>
                  </div>{" "}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-3">
                      <Label htmlFor="department">Department</Label>
                      <Select id="department" className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="BSCS">BSCS</SelectItem>
                            <SelectItem value="BSSW">BSSW</SelectItem>
                            <SelectItem value="BSIT">BSIT</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="year">Year</Label>
                      <Input id="year" type="number" min="1" max="4" required />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="text" required />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                      Signup
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?
                  <p
                    className="underline underline-offset-4"
                    onClick={() => setForm((prev) => !prev)}
                  >
                    Login
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
