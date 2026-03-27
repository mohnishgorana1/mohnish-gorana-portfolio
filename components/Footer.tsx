import Link from "next/link";

const Footer = () => {
  // Using pure semantic variables for uniformity
  const linkClassNames = "text-muted-foreground hover:text-foreground transition-colors hover:scale-105 duration-300 ease-in-out";
  
  return (
    <footer className="flex flex-col items-center justify-between gap-6 py-8 text-sm bg-transparent border-t border-border mt-12">
      
      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-6 font-medium">
        <Link href="/about" className={linkClassNames}>About</Link>
        <Link href="/projects" className={linkClassNames}>Projects</Link>
        <Link href="/machine-coding-tasks" className={linkClassNames}>Machine Coding</Link>
        <Link href="/contact" className={linkClassNames}>Contact</Link>
      </div>

      {/* Social Links */}
      <div className="flex gap-6">
        <Link
          href="https://github.com/mohnishgorana1"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassNames}
        >
          GitHub
        </Link>
        <Link
          href="https://www.linkedin.com/in/mohnish-gorana/"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassNames}
        >
          LinkedIn
        </Link>
        <Link href="mailto:mohnishgorana1@gmail.com" className={linkClassNames}>
          Email
        </Link>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Mohnish Gorana. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;