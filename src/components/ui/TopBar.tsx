export const TopBar = () => {
  return (
    <div
      className="fixed top-0 h-12 w-main-content full py-1 px-4 flex items-center bg-blur transition-none"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <h2 className="font-bold text-xl">Home</h2>
    </div>
  );
};
