export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t border-border py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
          <p className='text-sm text-muted-foreground'>
            © {currentYear} Aravind Sathesh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
