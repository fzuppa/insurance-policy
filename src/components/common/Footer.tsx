export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} PolicyPilot. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Your trusted partner in insurance solutions.
        </p>
      </div>
    </footer>
  );
}
