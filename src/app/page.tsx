
// app/page.tsx (App Router 사용 시)

'use client';

import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { useInView } from 'react-intersection-observer'; // useInView 훅 임포트


// teacherPicks.json 데이터를 임포트합니다.
import teacherPicksData from '../../data/allOutputs.json';

import ProjectCard from '../components/common/ProjectCard';

// --- 배경 이미지 목록 (public/images 폴더에 이미지를 넣어주세요!) ---
const backgroundImageUrls = [
  '/images/bg1.jpg',
  '/images/bg2.jpg',
  '/images/bg3.jpg',
];

export default function Home() {
  // --- react-slick 설정 ---
  const settings = {
    dots: false,         // 페이지 네비게이션 점 표시 여부
    infinite: true,      // 무한 루프 여부
    speed: 1000,         // 전환 속도 (밀리초)
    slidesToShow: 1,     // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1,   // 한 번에 스크롤될 슬라이드 수
    autoplay: true,      // 자동 재생 여부
    autoplaySpeed: 5000, // 자동 재생 간격 (밀리초)
    fade: true,          // 페이드 효과 사용 (슬라이드 전환 대신 부드럽게 사라지고 나타남)
    arrows: false,       // 좌우 이동 화살표 표시 여부
    pauseOnHover: false, // 마우스 오버 시 자동 재생 일시 정지 여부
  };

  // GYSAN HIGH SCHOOL AI DIGITAL LAB 문구에 사용할 ref와 inView 상태
  const { ref: mainTitleRef, inView: mainTitleInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // About 섹션의 제목(h1)과 내용(p)에 사용할 ref와 inView 상태
  const { ref: aboutTitleRef, inView: aboutTitleInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const { ref: aboutContentRef, inView: aboutContentInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // BEST TOP-3 OUTPUT 섹션 제목에 사용할 ref와 inView 상태
  const { ref: top3TitleRef, inView: top3TitleInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });


  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* --- 배경 슬라이더 영역 --- */}
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

      {/* --- 메인 콘텐츠 영역 (배경 위에 올라오도록 z-index 설정) --- */}
      <div className="relative z-10 w-full">

        {/* 2. 메인 페이지 - GYSAN HIGH SCHOOL AI DIGITAL LAB 문구 */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-16">
          <div
            ref={mainTitleRef}
            className={`
              transition-all duration-1000 ease-out
              ${mainTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
              text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 animate-pulse
            `}
          >
            GYSAN HIGH SCHOOL<br></br>
            AI DIGITAL LAB
          </div>
          <p
            className={`
              transition-all duration-1000 ease-out delay-300
              ${mainTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
              text-xl md:text-3xl text-gray-200
            `}
          >
            계산고등학교 AI 디지털 연구소
          </p>
        </section>

        {/* --- About 섹션 --- */}
         <div className="bg-stone-900 py-12 md:py-20">
          <section className="container mx-auto p-8">
            <h1
              ref={aboutTitleRef}
              className={`
                transition-all duration-1000 ease-out
                ${aboutTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                text-5xl text-white font-bold text-center mb-6`}>
              About
              <span className='inline-block text-blue-500 font-bold text-6xl'>
                {/* `animate-bounceIn` 대신 `animate-direct-bounce-in` 사용 */}
                {/* 초기 상태를 위한 클래스도 직접 정의한 `initial-hidden-below` 사용 */}
                <span className={`
                  inline-block
                  ${aboutTitleInView ? 'animate-direct-bounce-in' : 'initial-hidden-below'}
                `}> US</span>
              </span>
            </h1>
            <div
              ref={aboutContentRef}
              className={`
                transition-all duration-1000 ease-out delay-300
                ${aboutContentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                text-center
              `}
            >
              <p className='text-white text-lg md:text-3xl font-[NexonLv1Gothic] leading-relaxed'>
                계산고등학교 AI 디지털 연구소는 AI 이외에도 여러 활동을 하며<br></br>
                학교에 제한하지 않고 여러 디지털과 접목시켜 여러 봉사활동을<br></br>
                나가며 더욱 창의적이고 진보적인 활동을 하고 이를 통해 학생<br></br>
                에게 끊임없는 발전, 혁신을 추구하는 것을 기대하는 중 입니다.<br></br>
              </p>
            </div>
          </section>
        </div>

        <div className="bg-stone-900 bg-opacity-70 py-12 md:py-20">
          <section className="container mx-auto p-10">
            <h1
              ref={aboutTitleRef} // 여기 ref 이름이 aboutTitleRef가 맞는지 확인해주세요. activitiesTitleRef 같은 이름이 더 적절할 수 있습니다.
              className={`
                transition-all duration-1000 ease-out
                ${aboutTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                text-5xl text-white font-bold text-center mb-6`}>
              Activities
            </h1>

            {/* ====== 👇 여기에 이미지 컴포넌트를 추가합니다 👇 ====== */}
            <div className="text-center mt-8 p-10"> {/* 이미지 중앙 정렬 및 위 여백 */}
              <div
              ref={aboutContentRef}
              className={`
                transition-all duration-1000 ease-out delay-300
                ${aboutContentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                text-center
              `}>
                <Image
                  src="/images/bg1.jpg" // public/images/activities.jpg 경로에 맞게 수정
                  alt="Activities of AI Digital Laboratory" // 이미지 설명을 위한 alt 텍스트
                  width={1000} // 원하는 이미지의 너비
                  height={450} // 원하는 이미지의 높이 (비율에 맞게 조절)
                  className="mx-auto rounded-lg shadow-lg" // 중앙 정렬, 모서리 둥글게, 그림자
                />
              </div>
            </div>
            <p className='text-white text-lg md:text-3xl font-[NexonLv1Gothic] leading-relaxed text-center'>
                계산고등학교 AI 디지털 연구소는 AI, 라즈베리파이, 마이크로비트<br></br>
                자율주행 자동차, 유니티, 웹 실무를 강사를 초청해 아이들에게 가르치고<br></br>
                이후 개인 프로젝트까지 확장하여 아이들이 직접 응용하고 사용할 수 있도록<br></br>
                돕고, 더욱 더 프로그래밍에 흥미를 가지도록 돕습니다.<br></br>
              </p>

          </section>
        </div>

        {/* 3. 선생님 픽 Top 3 산출물 섹션 */}
         <div className="bg-stone-900 bg-opacity-70 py-12 md:py-20">
          <section className="container mx-auto p-8">
            <h2
              ref={top3TitleRef}
              className={`
                transition-all duration-1000 ease-out
                ${top3TitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                text-3xl md:text-4xl font-bold text-center text-white mb-10
              `}
            >
              RECENT PROJECT
            </h2>

            {/* <<< --- 아래 이 div 안의 내용을 정확히 바꿔줍니다 --- >>> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teacherPicksData.slice(0, 3).map((project, index) => ( // .slice(0,3)으로 상위 3개만 제한
                <ProjectCard
                  key={project.id} // ProjectCard는 자체적으로 모든 카드 UI를 포함합니다.
                  project={project}
                  index={index}
                  delay={0}
                />
              ))}
            </div>
            {/* <<< --------------------------------------------- >>> */}

            <div
              className={`
                transition-all duration-1000 ease-out delay-500
                ${top3TitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                text-center mt-12
              `}
            >
              <Link href="/outputs" passHref>
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