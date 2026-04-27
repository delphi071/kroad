import Footer from "./Footer";

export default function SubpagePlaceholder({ title }: { title: string }) {
  return (
    <div className="bg-grayscale-100 text-black">
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 md:py-[180px]">
        <p className="font-pretendard text-[24px] font-extrabold tracking-[-0.6px] text-black md:text-[60px]">
          {title}
        </p>
        <p className="mt-4 font-pretendard text-[14px] text-grayscale-600 md:text-[24px]">
          준비 중인 콘텐츠입니다.
        </p>
      </section>
      <Footer />
    </div>
  );
}
