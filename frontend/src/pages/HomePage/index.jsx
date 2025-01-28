import DefaultLayout from "@layouts/DefaultLayout";
import Footer from "@/components/modules/HomePage/Footer";
import JumboTron from "@/components/modules/HomePage/JumboTron";
import SectionBenefit from "@/components/modules/HomePage/SectionContents/SectionBenefit";
import SectionFAQ from "@/components/modules/HomePage/SectionContents/SectionFAQ";
import MovieList from "@/components/modules/Common/MovieList";
import ModalMovie from "@/components/modules/Common/ModalMovie";

function HomePage() {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <JumboTron />

      {/* Movie Populer */}
      <div className="pt-10 -mb-8 bg-slate-950">
        <div className="w-full mx-auto max-w-[100rem]">
          <MovieList title={"Popular Movie"} moviesType="popular" />
        </div>
      </div>

      {/* Benefit Section */}
      <SectionBenefit />

      {/* FAQ Section */}
      <SectionFAQ />

      {/* Footer */}
      <Footer />

      <ModalMovie />
    </DefaultLayout>
  );
}
export default HomePage;
