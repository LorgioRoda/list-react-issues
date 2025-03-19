export interface Issue {
    id: string,
    title: string,
    state: State
}

type State = 'open' | 'close'