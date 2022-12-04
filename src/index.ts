import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/function';

interface configuration {
    a: string;
    b: number;
}

interface Deps {
    fetch: typeof fetch;
}
interface WithFetch {
    fetch: typeof fetch;
}
export const populateC =
  ({ a, b }: { a: string, b: number }) =>
  ({ }) =>
  ({ fetch }: WithFetch): TE.TaskEither<Error, string> => {
    return pipe(
        TE.right(`${a} + ${b}`)
    )
}

export const populateD =
  ({ b }: { a: string, b: number }) =>
  ({ c }) =>
  ({ fetch }: WithFetch): TE.TaskEither<Error, string> => {
    return pipe(
        TE.right(`${c} + ${b}`)
    )
}
export const populateE =
  ({ }) =>
  ({ }) =>
  ({ fetch }: WithFetch): TE.TaskEither<Error, string> => {
    return pipe(
        TE.right(`is only a verification`)
    )
}

export const populateF =
  ({ }) =>
  ({ }) =>
  ({ fetch }: WithFetch): TE.TaskEither<Error, string> => {
    return pipe(
        TE.right(`this is just a verficiation case`)
    )
}

export const testingPipe1 = (data: configuration) => pipe(
    RTE.ask<Deps>(),
    RTE.bindTo('deps'),
    RTE.bindW('c', populateC(data)),
    RTE.bindW('d', populateD(data)),
    RTE.bindW('e', populateE(data)),
    RTE.bindW('X', (ctx) => RTE.fromTaskEither(TE.right(`${JSON.stringify(ctx)} : so this is the ctx`))),
    RTE.bindW('f', (ctx) => populateF(data)(ctx)),
)

export const testingPipe2 = (data: configuration) => pipe(
    RTE.ask<Deps>(),
    RTE.bindTo('deps'),
    RTE.bindW('c', populateC(data)),
    RTE.bindW('d', populateD(data)),
    RTE.bindW('e', (a) => populateE(data)(a)),
    RTE.bindW('X', (ctx) => RTE.fromTaskEither(TE.right(`${JSON.stringify(ctx)} : so this is the ctx`))),
    RTE.bindW('f', (ctx) => populateF(data)(ctx)),
)

const result = testingPipe1({a: '1', b: 2})

console.log('this is the first result')
result({fetch})().then(console.log).catch(console.error)


const result2 = testingPipe2({a: '1', b: 2})

console.log('this is the second result')
result2({fetch})().then(console.log).catch(console.error)