import { useData as useData$ } from 'vitepress'
import type { DefaultTheme } from '../../../../theme'

export const useData: typeof useData$<DefaultTheme.Config> = useData$
