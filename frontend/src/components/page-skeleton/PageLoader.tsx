import { usePing } from '@/app/hooks/usePing.ts';

export const PageLoader = () =>{
  const {error} = usePing()

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-200">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-500">Cannot reach server</p>
          <p className="text-slate-600">Please try refreshing or check your connection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-200">
      <div className="size-20 bg-transparent border-8 border-b-transparent border-slate-300 rounded-full animate-spin" />
    </div>
  );
};