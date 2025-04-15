export default function InlineLoader() {
  console.log('inline loader');
  return (
    <div className="flex flex-1 h-full items-center justify-center -translate-y-1/8 bg-transparent">
      <div className="size-20 bg-transparent border-8 border-b-transparent border-slate-300 rounded-full animate-spin" />
    </div>
  );
}
