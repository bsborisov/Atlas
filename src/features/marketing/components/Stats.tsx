import { SwordsIcon, TrophyIcon, UsersIcon } from "lucide-react"
import { ComponentType } from "react"

const StatsInnerCard = ({
    title,
    Icon, 
    value,
}:{
    title:string, 
    Icon?: ComponentType,
    value:string
}) => {
    return (
        <div className="p-px rounded-full home-stats-border-gradient-bg">
            <div className="flex flex-col items-center gap-1 rounded-full home-stats-gradient-bg py-2 px-14">
                <span className="font-mont tracking-wide text-xs font-normal leading-5 whitespace-nowrap text-app-grey md:text-sm">
                    {title}
                </span>
                <div className="flex flex-row items-center justify-center gap-1">
                    {Icon && <Icon />}
                    <span className="font-mont tracking-wide text-base font-semibold leading-5 whitespace-nowrap md:text-[22px]">{value}</span>
                </div>
            </div>
        </div>
    )
}

export const Stats = () => {
    return (
        <div className="flex flex-col items-center gap-4 w-auto my-0 mx-auto py-4 px-0 md:flex-row md:justify-center md:m-0 md:py-0 md:px-4">
            <StatsInnerCard title="Players Online" Icon={UsersIcon} value="105,018" />
            <StatsInnerCard title="Live Matches" Icon={SwordsIcon} value="4,416" />
            <StatsInnerCard title="Rewards to Date" Icon={TrophyIcon} value="$10 Million+" />
        </div>
    )
}