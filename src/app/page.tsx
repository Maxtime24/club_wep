'use client';

import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProjectCard from '../components/common/ProjectCard';

// --- 배경 이미지 목록 (public/images 폴더) ---
const backgroundImageUrls = [
  '/images/bg1.jpg',
  '/images/bg2.jpg',
  '/images/bg3.jpg',
];

type ProjectType = {
  id: string;
  title: string;
  description: string;
  image?: string;
  content?: string;
  tags?: string[];
  link?: string;
};

export default function Home() {
  const [topProjects, setTopProjects] = useState<ProjectType[]>([]);

  const { ref: mainTitleRef, inView: mainTitleInView } = useInView({ triggerOnce: false, threshold: 0.5 });
  const { ref: aboutTitleRef, inView: aboutTitleInView } = useInView({ triggerOnce: false, threshold: 1 });
  const { ref: aboutContentRef, inView: aboutContentInView } = useInView({ triggerOnce: false, threshold: 0.2 });
  const { ref: top3TitleRef, inView: top3TitleInView } = useInView({ triggerOnce: false, threshold: 0.2 });

  // --- react-slick 설정 ---
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: true,
    pauseOnHover: false,
  };

  // DB에서 Top 3 프로젝트 가져오기
  async function fetchTopProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: false })
      .limit(3);

    if (error) console.error('Failed to fetch top projects:', error);
    else setTopProjects(data || []);
  }

  useEffect(() => {
    fetchTopProjects();

    const channel = supabase
      .channel('realtime:projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        fetchTopProjects();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* 배경 슬라이더 */}
      <div className="absolute inset-0 z-0">
        <Slider {...settings}>
          {backgroundImageUrls.map((url, index) => (
            <div key={index} className="h-screen w-screen relative">
              <Image
                src={url}
                alt={`배경 이미지 ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                className="brightness-50 blur-sm"
                priority={index === 0}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 w-full">
        {/* 메인 문구 */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-16">
          <div
            ref={mainTitleRef}
            className={`transition-all duration-1000 ease-out ${
              mainTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            } text-10xl md:text-10xl lg:text-8xl font-[foot-bal] text-white mb-2 animate-pulse`}
          >
            GYESAN HIGH SCHOOL<br />
            AI DIGITAL LAB
          </div>
          <p
            className={`transition-all duration-1000 ease-out delay-300 ${
              mainTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            } text-xl md:text-3xl text-gray-200 font-[GMarketSans]`}
          >
            계산고등학교 AI 디지털 연구소
          </p>
        </section>

        {/* About 섹션 */}
        <div className="bg-stone-900 py-12 md:py-20">
          <section className="container mx-auto p-8">
            <h1
              className={`text-5xl text-white font-bold text-center mb-6`}
            >
              About
              <span className="inline-block text-blue-500 font-bold text-6xl">
                <span
                  className={`inline-block ${
                    aboutTitleInView ? 'animate-direct-bounce-in' : 'initial-hidden-below'
                  }`}
                >
                  US
                </span>
              </span>
            </h1>
            <div
              ref={aboutContentRef}
              className={`transition-all duration-1000 ease-out delay-200 ${
                aboutContentInView ? 'opacity-100 translate-y-5' : 'opacity-0 translate-y-5'
              } text-center`}
            >
              <p className="text-white text-lg md:text-3xl font-[GMarketSans] leading-[2rem] md:leading-[3rem]">
                계산고등학교 AI 디지털 연구소는 AI 이외에도 여러 활동을 하며<br />
                학교에 제한하지 않고 여러 디지털과 접목시켜 여러 봉사활동을<br />
                나가며 더욱 창의적이고 진보적인 활동을 하고 이를 통해 학생<br />
                에게 끊임없는 발전, 혁신을 추구하는 것을 기대하는 중 입니다.<br />
              </p>
            </div>
          </section>
        </div>

       <div
  className="bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat py-20 md:py-50"
>
  <section className="container mx-auto p-10 bg-stone-300/70 rounded-lg">
    <h1
      ref={aboutTitleRef}
      className={`transition-all duration-1000 ease-out ${
        aboutTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      } text-6xl text-black font-bold text-center mb-6`}
    >
      Activities
    </h1>
    <div className="text-center mt-8 p-10">
      <div
        ref={aboutContentRef}
        className={`transition-all duration-1000 ease-out delay-300 ${
          aboutContentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        } text-center`}
      >
        <Image
          src="/images/bg2.jpg"
          alt="Activities of AI Digital Laboratory"
          width={1000}
          height={450}
          className="mx-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
    <p className="text-black leading-[2rem] md:leading-[3rem] text-lg md:text-3xl font-[GMarketSans] font-bold text-center">
      계산고등학교 AI 디지털 연구소는 AI, 라즈베리파이, 마이크로비트<br />
      자율주행 자동차, 유니티, 웹 실무를 강사를 초청해 아이들에게 가르치고<br />
      이후 개인 프로젝트까지 확장하여 아이들이 직접 응용하고 사용할 수 있도록<br />
      돕고, 더욱 더 프로그래밍에 흥미를 가지도록 돕습니다.<br />
    </p>
  </section>
</div>


        {/* Top 3 Projects 섹션 (DB에서 가져오기) */}
        <div className="bg-stone-900 bg-opacity-70 py-12 md:py-20">
          <section className="container mx-auto p-10">
            <h2
              ref={top3TitleRef}
              className={`transition-all duration-1000 ease-out ${
                top3TitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              } text-3xl md:text-4xl font-bold text-center text-white mb-10`}
            >
              RECENT PROJECT
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topProjects.map((project, index) => {
                const firstImage =
                  project.image ||
                  (() => {
                    const match = project.content?.match(/<img[^>]+src="([^">]+)"/i);
                    return match ? match[1] : '/images/default.png';
                  })();

                return <ProjectCard key={project.id} project={{ ...project, image: firstImage }} index={index} delay={0} />;
              })}
            </div>

            <div
              className={`transition-all duration-1000 ease-out delay-500 ${
                top3TitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              } text-center mt-12`}
            >
              <Link href="/outputs">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg bg-opacity-90 transition-transform transform hover:scale-105 duration-300">
                  모든 산출물 보러가기
                </button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
