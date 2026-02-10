import { UserCard } from "@/components/user-card";
import { LOGGED_IN_USER, USERS, User } from "@/lib/constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users as UsersIcon } from "lucide-react";

function findMatches(currentUser: User, allUsers: User[]): User[] {
  const potentialMatches: User[] = [];
  
  const usersToConsider = allUsers.filter(u => u.id !== currentUser.id);

  for (const otherUser of usersToConsider) {
    const currentUserTeachesWhatOtherLearns = currentUser.teaches.some(skill => otherUser.learns.includes(skill));
    const otherUserTeachesWhatCurrentUserLearns = otherUser.teaches.some(skill => currentUser.learns.includes(skill));
    
    if (currentUserTeachesWhatOtherLearns && otherUserTeachesWhatCurrentUserLearns) {
      potentialMatches.push(otherUser);
    }
  }
  
  return potentialMatches;
}

export default function MatchesPage() {
  const matches = findMatches(LOGGED_IN_USER, USERS);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Find Your Skill Swap Match</h1>
        <p className="text-muted-foreground">
          Connect with users who can teach you what you want to learn, and vice-versa.
        </p>
      </div>

      {matches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <Alert>
          <UsersIcon className="h-4 w-4" />
          <AlertTitle>No Matches Found</AlertTitle>
          <AlertDescription>
            We couldn't find any users with complementary skills right now. Try expanding the skills you can teach or want to learn!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
