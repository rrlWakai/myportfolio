export default function Footer() {
  return (
    <footer className="mt-15 py-6 border-t border-gray-300 text-center">
      <p className="text-sm text-black-600">
        © {new Date().getFullYear()} Rhen-Rhen A. Lumbo. All rights reserved.
      </p>
      <p className="text-sm text-black-600">Deuteronomy 31:8</p>
      <p className="text-sm text-black-600">
        "The LORD himself goes before you and will be with you; He will never
        leave you nor forsake you. Do not be afraid; do not be discouraged."
      </p>
    </footer>
  );
}
