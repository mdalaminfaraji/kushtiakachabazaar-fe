import { ModeToggle } from "@/components/common/modeToggle";

export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline text-muted-foreground">
      Hello world!
      <ModeToggle />
    </h1>
  );
}
