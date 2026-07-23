import { MainHeroRuntime } from "./MainHeroRuntime/MainHeroRuntime"
import { MainHeroTexts } from "./MainHeroTexts"

export const MainLanding = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-atlas-darkest-blue py-18 px-24 gap-16 items-center">
      <div className="absolute top-15 right-14 w-130 h-130 bg-atlas-cyan/[12%] blur-[110px] z-3"></div>
      <div className="absolute top-75 right-0 w-105 h-105 bg-atlas-purple/[12%] blur-[120px] z-3"></div>
      <MainHeroTexts />
      <MainHeroRuntime />
    </div>
  )
}