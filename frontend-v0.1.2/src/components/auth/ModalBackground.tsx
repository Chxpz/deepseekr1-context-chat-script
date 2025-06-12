
export const ModalBackground = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-600/20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(45deg, transparent 40%, rgba(0, 255, 255, 0.1) 50%, transparent 60%),
          linear-gradient(-45deg, transparent 40%, rgba(0, 150, 255, 0.1) 50%, transparent 60%)
        `,
        backgroundSize: '60px 60px',
        animation: 'slide 8s linear infinite'
      }}></div>
    </div>
  );
};
