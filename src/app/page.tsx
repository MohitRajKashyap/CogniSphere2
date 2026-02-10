import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LOGGED_IN_USER, SKILLS } from "@/lib/constants";
import { Coins, Lightbulb, Star, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SkillBadge = ({ skillName }: { skillName: string }) => {
  const skill = SKILLS.find(s => s.name === skillName);
  if (!skill) return <Badge variant="secondary">{skillName}</Badge>;

  const Icon = skill.icon;
  return (
    <Badge variant="secondary" className="flex items-center gap-2 text-sm font-normal">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span>{skillName}</span>
    </Badge>
  );
};

export default function DashboardPage() {
  const user = LOGGED_IN_USER;

  return (
    <div className="grid gap-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.name}!</h1>
            <p className="text-muted-foreground">Ready to swap some skills?</p>
          </div>
        </div>
        <Card className="sm:max-w-xs w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Your Stats</span>
              <Coins className="h-5 w-5 text-amber-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-around gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">{user.credits}</p>
              <p className="text-xs text-muted-foreground">Credits</p>
            </div>
            <div>
              <p className="text-3xl font-bold flex items-center justify-center gap-1">
                {user.rating.toFixed(1)}
                <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              </p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Skills You Can Teach
            </CardTitle>
            <CardDescription>Share your knowledge and earn credits.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.teaches.map(skill => (
                <SkillBadge key={skill} skillName={skill} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-accent" />
              Skills You Want to Learn
            </CardTitle>
            <CardDescription>Spend your credits to gain new expertise.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {user.learns.map(skill => (
                <SkillBadge key={skill} skillName={skill} />
              ))}
            </div>
             <Link href="/learn" className="mt-2">
                <Button>
                  Start Learning
                </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
