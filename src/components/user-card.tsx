import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LOGGED_IN_USER, SKILLS, User } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, Lightbulb, Star, Zap } from "lucide-react";

const SkillIcon = ({ skillName, className }: { skillName: string, className?: string }) => {
    const skill = SKILLS.find(s => s.name === skillName);
    if (!skill) return null;
    const Icon = skill.icon;
    return <Icon className={cn("h-4 w-4", className)} title={skillName} />;
}


export function UserCard({ user }: { user: User }) {
    const currentUser = LOGGED_IN_USER;
    const teachesMatch = user.teaches.filter(skill => currentUser.learns.includes(skill));
    const learnsMatch = user.learns.filter(skill => currentUser.teaches.includes(skill));

    return (
        <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-secondary">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>{user.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span>{user.rating.toFixed(1)} Rating</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-green-400" /> They Can Teach You
                    </h4>
                    <div className="flex flex-wrap gap-1">
                        {teachesMatch.map(skill => (
                            <Badge key={skill} variant="outline" className="bg-green-900/20 border-green-500/50">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>
                 <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-blue-400" /> They Want To Learn
                    </h4>
                    <div className="flex flex-wrap gap-1">
                        {learnsMatch.map(skill => (
                            <Badge key={skill} variant="outline" className="bg-blue-900/20 border-blue-500/50">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    Connect <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
}
