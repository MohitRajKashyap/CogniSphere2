import { LearningModule } from "./learning-module";

export default function LearnPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learn a New Skill</h1>
        <p className="text-muted-foreground">
          Select a skill and let our AI generate a personalized learning module for you.
        </p>
      </div>
      <LearningModule />
    </div>
  );
}
