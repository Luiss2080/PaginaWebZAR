export default function SkeletonGrilla({ cantidad = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
      {Array.from({ length: cantidad }).map((_, indice) => (
        <div key={indice} className="animate-pulse">
          <div className="aspect-[3/4] w-full bg-gris" />
          <div className="mt-4 h-3 w-3/4 bg-gris" />
          <div className="mt-2 h-3 w-1/3 bg-gris" />
        </div>
      ))}
    </div>
  );
}
