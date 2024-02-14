import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-10 text-center">
      <div className="flex justify-center gap-4 mt-4">
        <a
          href="https://github.com/ArtinNazarian?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-gray-500 h-6 w-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/artnazarian/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn className="text-gray-500 h-6 w-6" />
        </a>
      </div>
    </footer>
  );
}
