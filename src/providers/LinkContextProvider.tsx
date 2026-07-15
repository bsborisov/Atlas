import { createContext, ReactNode, use, useMemo } from "react"

type LinkContextType = {
    linkComponent?: string
}

const LinkContext = createContext<LinkContextType>({
    linkComponent: undefined
})

export const LinkProvider = ({
    children, 
    linkComponent
}:{
    children: ReactNode, 
    linkComponent: string
}) => {
    const value = useMemo(() => ({
        linkComponent
    }), [linkComponent]);

    return (
        <LinkContext.Provider value={value}>
            {children}
        </LinkContext.Provider>
    )
}

export const useLinkContext = () => use(LinkContext)