export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto p-4 text-center">
        © {new Date().getFullYear()} ArtStore. All rights reserved.
      </div>
    </footer>
  );
}
