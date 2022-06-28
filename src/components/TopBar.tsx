export const TopBar = () => {
  return (
    <div
      className="sticky top-0 h-12 py-1 px-4 flex items-center bg-blur transition-none"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <h2 className="font-bold text-xl">Home</h2>
    </div>
  );
};
