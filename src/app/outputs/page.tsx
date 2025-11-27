import { getSupabaseServer } from '@/lib/supabaseClient';
import ProjectCard from '@/components/common/ProjectCard';

// ✅ ISR 비활성화 또는 긴 시간으로 설정
export const revalidate = 0; // 또는 3600 (1시간)
// export const dynamic = 'force-dynamic'; // 완전 동적으로 하려면 이걸 사용

export default async function OutputsPage() {
  const supabase = getSupabaseServer();
  
  // ✅ content 필드 제외 (용량 감소)
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, title, image, created_at, author') // content 제외!
    .order('id', { ascending: false })
    .limit(50); // ✅ 최대 50개로 제한

  if (error) {
    console.error('Supabase fetch error:', error);
    return <div className="text-red-500 text-center mt-10">데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (!projects || projects.length === 0) {
    return <div className="text-gray-400 text-center mt-10">등록된 프로젝트가 없습니다.</div>;
  }

  // ✅ 이미지 처리 간소화 (content가 없으므로)
  const processedProjects = projects.map((project) => {
    return {
      ...project,
      image: project.image || '/images/default.png'
    };
  });

  return (
    <div className="min-h-screen bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat text-white p-8 pt-24 md:pt-28">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12">
          프로젝트 결과물
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} delay={0} />
          ))}
        </div>
      </div>
    </div>
  );
}