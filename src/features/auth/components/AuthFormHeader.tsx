import { Heading } from "@/components/ui/Heading";

export default function AuthFormHeader({
    text
}:{
    text:string
}){
    return (
        <Heading size={1} className="flex flex-row items-center justify-center text-center text-[22px] leading-7 pt-2 px-12 pb-3">
            {text}
        </Heading>
    )
}