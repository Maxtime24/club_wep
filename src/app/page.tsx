'use client';

import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProjectCard from '../components/common/ProjectCard';

// --- 배경 이미지 목록 ---
const backgroundImageUrls = ['/images/bg1.jpg', '/images/bg2.jpg', '/images/bg3.jpg'];

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

  // --- 뷰포트 감지 ---
  const { ref: mainTitleRef, inView: mainTitleInView } = useInView({ triggerOnce: false, threshold: 0.3 });
  const { ref: aboutTitleRef, inView: aboutTitleInView } = useInView({ triggerOnce: false, threshold: 0.3, rootMargin: '-100px 0px' });
  const { ref: aboutTextRef, inView: aboutTextInView } = useInView({ triggerOnce: false, threshold: 0.3, rootMargin: '-120px 0px' });
  const { ref: activitiesTitleRef, inView: activitiesTitleInView } = useInView({ triggerOnce: false, threshold: 0.3, rootMargin: '-150px 0px' });
  const { ref: activitiesImageRef, inView: activitiesImageInView } = useInView({ triggerOnce: false, threshold: 0.3, rootMargin: '-150px 0px' });
  const { ref: activitiesTextRef, inView: activitiesTextInView } = useInView({ triggerOnce: false, threshold: 0.3, rootMargin: '-150px 0px' });
  const { ref: top3TitleRef, inView: top3TitleInView } = useInView({ triggerOnce: false, threshold: 0.3, rootMargin: '-120px 0px' });
  const { ref: top3ButtonRef, inView: top3ButtonInView } = useInView({ triggerOnce: false, threshold: 0.3, rootMargin: '-100px 0px' });

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

  // --- DB에서 Top 3 프로젝트 가져오기 ---
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
    const fetchData = async () => {
      await fetchTopProjects();
    };
    fetchData();

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
        <section className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-24">
          <div
            ref={mainTitleRef}
            className={`transition-all duration-1000 ease-out ${
              mainTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } text-8xl md:text-9xl font-[foot-bal] text-white mb-2 animate-pulse`}
          >
            GYESAN HIGH SCHOOL<br />
            AI DIGITAL LAB
          </div>
          <p
            className={`transition-all duration-1000 ease-out delay-300 ${
              mainTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            } text-xl md:text-3xl text-gray-200 font-[Pretendard]`}
          >
            계산고등학교 AI 디지털 연구소
          </p>
        </section>

        {/* About 섹션 */}
        <div className="bg-stone-900 py-16 md:py-24">
          <section className="container mx-auto p-8">
            <h1
              ref={aboutTitleRef}
              className={`transition-all duration-1000 ease-out text-5xl text-white font-bold text-center mb-6 ${
                aboutTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              About{' '}
              <span className="text-blue-500 font-bold text-6xl inline-block">
                US
              </span>
            </h1>
            <div
              ref={aboutTextRef}
              className={`transition-all duration-1000 ease-out delay-200 ${
                aboutTextInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } text-center`}
            >
              <p className="text-white text-lg md:text-2xl font-[Pretendard] leading-relaxed md:leading-[3rem]">
                계산고등학교 AI 디지털 연구소는 AI 이외에도 다양한 디지털 기술을<br />
                학교 밖에서도 활용하여 봉사, 프로젝트, 실험을 진행하며<br />
                창의적이고 진보적인 활동을 통해 학생들의 혁신적 사고를 기릅니다.
              </p>
            </div>
          </section>
        </div>

        {/* Activities 섹션 */}
        <div
          className="bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat py-20 md:py-40"
        >
          <section className="container mx-auto p-10 bg-stone-300/70 rounded-lg">
            <h1
              ref={activitiesTitleRef}
              className={`transition-all duration-1000 ease-out ${
                activitiesTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } text-6xl text-black font-bold text-center pt-10 pb-6`}
            >
              Activities
            </h1>

            <div
              ref={activitiesImageRef}
              className={`transition-all duration-1000 ease-out delay-300 ${
                activitiesImageInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } text-center mt-10`}
            >
              <Image
                src="/images/bg2.jpg"
                alt="Activities of AI Digital Laboratory"
                width={1000}
                height={450}
                className="mx-auto rounded-lg shadow-lg"
              />
            </div>

            <p
              ref={activitiesTextRef}
              className={`transition-all duration-1000 ease-out delay-500 ${
                activitiesTextInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } text-black text-lg md:text-2xl font-[Pretendard] font-semibold text-center p-10 leading-relaxed`}
            >
              AI, 라즈베리파이, 마이크로비트, 자율주행, 유니티, 웹 실무 등<br />
              다양한 기술 교육과 프로젝트를 통해 학생들이 직접 응용하고<br />
              프로그래밍의 즐거움을 체험할 수 있도록 돕습니다.
            </p>
          </section>
        </div>

        {/* Top 3 Projects 섹션 */}
        <div className="bg-stone-900 bg-opacity-70 py-16 md:py-24">
          <section className="container mx-auto p-10">
            <h2
              ref={top3TitleRef}
              className={`transition-all duration-1000 ease-out ${
                top3TitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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
              ref={top3ButtonRef}
              className={`transition-all duration-1000 ease-out delay-500 ${
                top3ButtonInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } text-center mt-12`}
            >
              <Link href="/outputs">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
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
